import EditProfileDialog from "../profile/EditProfileDialog";
import { getUrl } from "@/utils/getImageUrl";
import { useQuery } from "@apollo/client/react";
import { GET_USER } from "@/graphql/queries/user";
import type { User } from "@/interface/user";
import { useMeQuery } from "@/utils/user";

export default function HeaderUserProfile({ userId }: { userId: string }) {
  const { data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      id: userId,
    },
  });
  const { user: me } = useMeQuery();

  const user = data?.getUser;

  return (
    <header className="profile mt-18">
      <div className="container">
        <div className="profile-banner">
          <img
            src={user ? getUrl(user?.banner) : ""}
            alt="User Banner"
            className="profile-banner-image w-full h-90"
          />
        </div>

        <div className="profile-header p-4 center-y flex-col md:flex-row justify-between flex-wrap">
          <div className="profile-identity flex items-center md:items-start gap-x-4 flex-col md:flex-row">
            <img
              src={user ? getUrl(user?.image) : ""}
              className="profile-details w-40 h-40 rounded-full -translate-y-16 border-2 border-white"
              alt={user?.username}
            />

            <div className="profile-details -mt-12 md:mt-0 mb-4 md:mb-0 text-center md:text-start">
              <h3 className="profile-username text-3xl text-gray-900 mb-2">
                {user?.username}
              </h3>
              <p className="profile-description text-gray-400">
                {user?.description}
              </p>
            </div>
          </div>

          {me?.id === userId && <EditProfileDialog />}
        </div>
      </div>
    </header>
  );
}
