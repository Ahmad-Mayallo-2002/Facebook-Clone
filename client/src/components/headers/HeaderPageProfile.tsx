import { getUrl } from "@/utils/getImageUrl";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PAGE } from "@/graphql/queries/page";
import type { Page } from "@/interface/page";
import { useMeQuery } from "@/utils/user";
import {
  CANCEL_FOLLOWING,
  ADD_PAGE_FOLLOWING,
} from "@/graphql/mutations/follow";
import { DELETE_PAGE } from "@/graphql/mutations/page";
import { FOLLOWER_OR_NOT } from "@/graphql/queries/follow";
import { toast } from "react-toastify";
import EditPageDialog from "@/components/profile/EditPageDialog";
import { useNavigate } from "react-router-dom";

export default function HeaderPageProfile({ pageId }: { pageId: string }) {
  const { data } = useQuery<{ getPage: Page }>(GET_PAGE, {
    variables: { id: pageId },
  });
  const { user } = useMeQuery();
  const [addPageFollowing, { loading: addLoading }] =
    useMutation(ADD_PAGE_FOLLOWING);
  const [cancelFollowing, { loading: cancelLoading }] =
    useMutation(CANCEL_FOLLOWING);

  const { data: followerOrNotData, refetch } = useQuery<{
    followerOrNot: boolean;
  }>(FOLLOWER_OR_NOT, {
    variables: { targetId: pageId },
  });

  const handleFollow = () => {
    if (user?.id) {
      addPageFollowing({
        variables: { userId: user.id, pageId },
      })
        .then(() => {
          toast.success("Followed");
          refetch({ targetId: pageId });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const handleCancel = () => {
    if (user?.id) {
      cancelFollowing({
        variables: { userId: user.id, targetId: pageId },
      })
        .then(() => {
          toast.success("Unfollowed");
          refetch({ targetId: pageId });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const isOwner = user?.id === data?.getPage.userId;
  const navigate = useNavigate();
  const [deletePage] = useMutation(DELETE_PAGE);

  const handleDelete = () => {
    if (!data?.getPage?.id) return;
    deletePage({
      variables: { id: data.getPage.id },
    })
      .then(() => {
        toast.success("Page deleted");
        navigate("/feed");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <header className="profile mt-18">
      <div className="container">
        <div className="profile-banner">
          <img
            src={
              data?.getPage?.banner ? getUrl(data?.getPage?.banner) : undefined
            }
            alt="Page Banner"
            className="profile-banner-image w-full h-90"
          />
        </div>

        <div className="profile-header p-4 center-y flex-col md:flex-row justify-between flex-wrap">
          <div className="profile-identity flex items-center md:items-start gap-x-4 flex-col md:flex-row">
            <img
              src={
                data?.getPage?.image ? getUrl(data.getPage.image) : undefined
              }
              className="profile-details w-40 h-40 rounded-full -translate-y-16 border-2 border-white"
              alt={data?.getPage?.description}
            />

            <div className="profile-details -mt-12 md:mt-0 mb-4 md:mb-0 text-center md:text-start">
              <h3 className="profile-username text-3xl text-gray-900 mb-2">
                {data?.getPage?.description || "Untitled Page"}
              </h3>
            </div>
          </div>

          {isOwner ? (
            <div className="flex gap-x-4">
              <EditPageDialog page={data?.getPage} />
              <button
                onClick={handleDelete}
                className="main-button red-button py-2 cursor-pointer"
              >
                Delete Page
              </button>
            </div>
          ) : (
            <button
              disabled={addLoading || cancelLoading}
              onClick={
                followerOrNotData?.followerOrNot ? handleCancel : handleFollow
              }
              className="main-button blue-button py-2! cursor-pointer"
            >
              {followerOrNotData?.followerOrNot ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
