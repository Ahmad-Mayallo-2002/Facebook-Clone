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

export default function HeaderUserProfile({ userId }: { userId: string }) {
  const { data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      id: userId,
    },
  });
  const { user } = useMeQuery();
  const [
    addUserFollowing,
    { data: addData, error: addError, loading: addLoading },
  ] = useMutation(ADD_USER_FOLLOWING);
  const [
    cancelFollowing,
    { data: cancelData, error: cancelError, loading: cancelLoading },
  ] = useMutation(CANCEL_FOLLOWING);

  const handleFollow = () => {
    if (user?.id !== userId) {
      addUserFollowing({
        variables: {
          targetId: userId,
          userId: user?.id,
        },
      });
    }
  };

  const handleCancelFollowing = () => {
    if (user?.id === userId) {
      cancelFollowing({
        variables: {
          targetId: userId,
          userId: user?.id,
        },
      });
    }
  };

  if (addError) toast.error(addError.message);
  if (cancelError) toast.error(cancelError.message);

  if (addData) toast.success("Followed");
  if (cancelData) toast.success("Unfollowed");

  return (
    <header className="profile mt-18">
      <div className="container">
        <div className="profile-banner">
          <img
            src={data?.getUser?.banner ? getUrl(data?.getUser?.banner) : ""}
            alt="User Banner"
            className="profile-banner-image w-full h-90"
          />
        </div>

        <div className="profile-header p-4 center-y flex-col md:flex-row justify-between flex-wrap">
          <div className="profile-identity flex items-center md:items-start gap-x-4 flex-col md:flex-row">
            <img
              src={data?.getUser?.image ? getUrl(data?.getUser?.image) : ""}
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
            <button
              disabled={addLoading}
              onClick={handleFollow}
              className="main-button blue-button py-2!"
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
