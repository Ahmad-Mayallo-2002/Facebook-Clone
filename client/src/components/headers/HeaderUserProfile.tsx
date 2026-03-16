import EditProfileDialog from "../profile/EditProfileDialog";
import { getUrl } from "@/utils/getImageUrl";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USER } from "@/graphql/queries/user";
import type { User } from "@/interface/user";
import { useMeQuery } from "@/utils/user";
import CreatePageDialog from "../profile/CreatePageDialog";
import {
  ADD_USER_FOLLOWING,
  CANCEL_FOLLOWING,
} from "@/graphql/mutations/follow";
import { toast } from "react-toastify";
import { FOLLOWER_OR_NOT } from "@/graphql/queries/follow";
import {
  ACCEPT_OR_REJECT_FRIENDSHIP_REQUEST,
  SEND_FRIENDSHIP_REQUEST,
} from "@/graphql/mutations/friends";
import { GET_IS_FRIEND } from "@/graphql/queries/friends";
import { FriendRequest } from "@/enums/friendRequest";

export default function HeaderUserProfile({ userId }: { userId: string }) {
  const { user } = useMeQuery();

  // Get User Profile Owner Data
  const { data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      id: userId,
    },
  });

  // Get This User Is My Friend Or Not
  const { data: isFriend } = useQuery<{ isFriend: boolean }>(GET_IS_FRIEND, {
    variables: {
      userId: user?.id,
      friendId: userId,
    },
  });

  // Get I Follow This User Or Not
  const { data: followerOrNotData, refetch } = useQuery<{
    followerOrNot: boolean;
  }>(FOLLOWER_OR_NOT, {
    variables: {
      targetId: userId,
    },
  });

  // Add and Cancel User Following
  const [addUserFollowing, { loading: addLoading }] =
    useMutation(ADD_USER_FOLLOWING);
  const [cancelFollowing, { loading: cancelLoading }] =
    useMutation(CANCEL_FOLLOWING);

  // Send Friendship Request
  const [sendFriendshipRequest, { loading: sendLoading }] = useMutation(
    SEND_FRIENDSHIP_REQUEST,
  );

  // Mutation to Reject Current Friendship
  const [acceptOrReject, { loading: acceptOrRejectLoading }] = useMutation(
    ACCEPT_OR_REJECT_FRIENDSHIP_REQUEST,
  );

  const handleFollow = () => {
    if (user?.id !== userId) {
      addUserFollowing({
        variables: {
          targetId: userId,
          userId: user?.id,
        },
      })
        .then(() => {
          toast.success("Followed");
          refetch({
            targetId: userId,
          });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const handleCancelFollowing = () => {
    if (user?.id !== userId) {
      cancelFollowing({
        variables: {
          targetId: userId,
          userId: user?.id,
        },
      })
        .then(() => {
          toast.success("Unfollowed");
          refetch({
            targetId: userId,
          });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const handleSendFriendshipRequest = () => {
    sendFriendshipRequest({
      variables: {
        receiverId: userId,
        senderId: user?.id,
      },
    })
      .then(() => {
        toast.success("Friend request sent");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleCancelFriendship = async () => {
    acceptOrReject({
      variables: {
        status: FriendRequest.REJECTED,
        receiverId: userId,
        senderId: user?.id,
      },
      awaitRefetchQueries: true,
      refetchQueries: ["IsFriend"],
    })
      .then((res) => toast.success(`${res.data}`))
      .catch((err) => toast.error(err.message));
  };

  const handleFunction = isFriend?.isFriend
    ? handleCancelFriendship
    : handleSendFriendshipRequest;

  const isLoading = isFriend?.isFriend ? acceptOrRejectLoading : sendLoading;

  return (
    <header className="profile mt-18">
      <div className="container">
        <div className="profile-banner">
          <img
            src={
              data?.getUser?.banner ? getUrl(data?.getUser?.banner) : undefined
            }
            alt="User Banner"
            className="profile-banner-image w-full h-90"
          />
        </div>

        <div className="profile-header p-4 center-y flex-col md:flex-row justify-between flex-wrap">
          <div className="profile-identity flex items-center md:items-start gap-x-4 flex-col md:flex-row">
            <img
              src={
                data?.getUser?.image ? getUrl(data?.getUser?.image) : undefined
              }
              className="profile-details w-40 h-40 rounded-full -translate-y-16 border-2 border-white"
              alt={data?.getUser?.username}
            />

            <div className="profile-details -mt-12 md:mt-0 mb-4 md:mb-0 text-center md:text-start">
              <h3 className="profile-username text-3xl text-gray-900 mb-2">
                {data?.getUser?.username}
              </h3>
              <p className="profile-description text-gray-400">
                {data?.getUser?.description}
              </p>
            </div>
          </div>

          {user?.id === userId ? (
            <div className="flex gap-x-4">
              <EditProfileDialog />
              <CreatePageDialog userId={userId} />
            </div>
          ) : (
            <>
              <div className="flex gap-x-4">
                <button
                  disabled={addLoading || cancelLoading}
                  onClick={
                    followerOrNotData?.followerOrNot
                      ? handleCancelFollowing
                      : handleFollow
                  }
                  className="main-button blue-button py-2! cursor-pointer"
                >
                  {followerOrNotData?.followerOrNot ? "Unfollow" : "Follow"}
                </button>
                <button
                  onClick={handleFunction}
                  disabled={isLoading}
                  className="main-button blue-button cursor-pointer"
                >
                  {isFriend?.isFriend ? "Cancel Friend" : "Add Friend"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
