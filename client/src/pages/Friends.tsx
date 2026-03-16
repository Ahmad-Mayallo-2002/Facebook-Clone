import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_RECEIVER_REQUESTS,
  GET_SENDER_REQUESTS,
  GET_USER_FRIENDS,
} from "@/graphql/queries/friends";
import { useParams } from "react-router-dom";
import type { PaginatedData } from "@/interface/pagination";
import type { Friends } from "@/interface/friends";
import HeaderFeed from "@/components/headers/HeaderFeed";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  ACCEPT_OR_REJECT_FRIENDSHIP_REQUEST,
  CANCEL_FRIENDSHIP,
} from "@/graphql/mutations/friends";
import { FriendRequest } from "@/enums/friendRequest";
import { getUrl } from "@/utils/getImageUrl";

export default function Friends() {
  const { userId } = useParams();

  // Get User Friends
  const {
    data: friends,
    loading,
    error,
  } = useQuery<{
    getUserFriends: PaginatedData<Friends>;
  }>(GET_USER_FRIENDS, {
    variables: { userId, take: 10, skip: 0 },
    skip: !userId,
  });

  // Get Received Friendship Requests
  const { data: receiverRequestsData } = useQuery<{
    getReceiverRequests: PaginatedData<Friends>;
  }>(GET_RECEIVER_REQUESTS, {
    variables: {
      take: 10,
      skip: 0,
      receiverId: userId,
    },
    skip: !userId,
  });

  // Get Sent Friendship Requests
  const { data: senderRequestsData } = useQuery<{
    getSenderRequests: PaginatedData<Friends>;
  }>(GET_SENDER_REQUESTS, {
    variables: {
      take: 10,
      skip: 0,
      senderId: userId,
    },
    skip: !userId,
  });

  // Accept or Reject Friendship Request
  const [acceptOrRejectFriendshipRequest] = useMutation(
    ACCEPT_OR_REJECT_FRIENDSHIP_REQUEST,
  );

  // Cancel Current Friendship
  const [cancelFriendship] = useMutation(CANCEL_FRIENDSHIP);

  const refetchFriendshipQueries = [
    "GetUserFriends",
    "GetReceiverRequests",
    "GetSenderRequests",
  ];

  const handleAcceptOrReject = async (
    status: FriendRequest,
    senderId: string,
    receiverId: string,
  ) => {
    if (!userId) return;

    await acceptOrRejectFriendshipRequest({
      variables: {
        status,
        senderId,
        receiverId,
      },
      refetchQueries: refetchFriendshipQueries,
      awaitRefetchQueries: true,
    }).catch((err) => console.log(err.message));
  };

  const handleCancelFriendship = async (friendshipId: string) => {
    if (!userId) return;

    await cancelFriendship({
      variables: { friendshipId },
      refetchQueries: refetchFriendshipQueries,
      awaitRefetchQueries: true,
    }).catch((err) => console.log(err.message));
  };

  const friendsList = friends?.getUserFriends?.data ?? [];
  const receiverRequests =
    receiverRequestsData?.getReceiverRequests?.data ?? [];
  const senderRequests = senderRequestsData?.getSenderRequests?.data ?? [];
  const combinedRequests = [
    ...receiverRequests.map((request) => ({
      kind: "received",
      request,
    })),
    ...senderRequests.map((request) => ({
      kind: "sent",
      request,
    })),
  ];

  return (
    <>
      <HeaderFeed />
      {/* Combined Friendship Requests */}
      <section className="mt-36 px-4">
        <div className="container mt-4">
          <h3 className="text-gray-900 text-2xl mb-4">Friendship Requests</h3>
          {combinedRequests.length === 0 ? (
            <p className="text-gray-500">No pending friendship requests.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {combinedRequests.map(({ kind, request }) => {
                const isReceived = kind === "received";
                const otherUser = isReceived
                  ? request.sender
                  : request.receiver;

                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between bg-white rounded-lg shadow p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getUrl(otherUser?.image) ?? undefined}
                        alt={otherUser.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {otherUser.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isReceived
                            ? `${otherUser.username} sent to you friendship request`
                            : `you send friendship request to ${otherUser.username}`}
                        </p>
                      </div>
                    </div>
                    {isReceived ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleAcceptOrReject(
                              FriendRequest.ACCEPTED,
                              request.senderId,
                              request.receiverId,
                            )
                          }
                          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAcceptOrReject(
                              FriendRequest.REJECTED,
                              request.senderId,
                              request.receiverId,
                            )
                          }
                          className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancelFriendship(request.id)}
                        className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* My Friends */}
      {!friends ? (
        <>
          {loading ? (
            <div className="center h-[calc(100vh-64px)]">
              <AiOutlineLoading3Quarters className="text-blue-500 text-7xl animate-spin" />
            </div>
          ) : (
            <div className="center h-[calc(100vh-64px)]">
              <h3 className="text-gray-900 text-3xl">{error?.message}</h3>
            </div>
          )}
        </>
      ) : (
        <>
          <section className="mt-10 px-4 my-friends">
            <div className="container">
              <h3 className="text-gray-900 text-3xl mb-4">My Friends</h3>
              {friendsList.length === 0 ? (
                <p className="text-gray-500">
                  You do not have any friends yet.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {friendsList.map((friend) => {
                    const isSender = friend.senderId === userId;
                    const otherUser = isSender
                      ? friend.receiver
                      : friend.sender;

                    return (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between bg-white rounded-lg shadow p-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={getUrl(otherUser.image) ?? undefined}
                            alt={otherUser.username}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {otherUser.username}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCancelFriendship(friend.id)}
                          className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
                        >
                          Cancel friendship
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
