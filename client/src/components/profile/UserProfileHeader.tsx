import { mainEndPoint } from "@/assets/assets";
import { useMeQuery } from "@/utils/user";
import EditProfileDialog from "./EditProfileDialog";

export default function UserProfileHeader() {
  const { user } = useMeQuery();

  return (
    <section className="profile mt-18">
      <div className="container">
        <div className="profile-banner">
          <img
            src={
              user?.banner?.public_id
                ? user?.banner?.url
                : mainEndPoint + user?.banner?.url
            }
            alt="User Banner"
            className="profile-banner-image w-full h-90"
          />
        </div>

        <div className="profile-header p-4 center-y flex-col md:flex-row justify-between flex-wrap">
          <div className="profile-identity flex items-center md:items-start gap-x-4 flex-col md:flex-row">
            <img
              src={
                user?.image?.public_id
                  ? user?.image?.url
                  : mainEndPoint + user?.image?.url
              }
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

          <EditProfileDialog />
        </div>
      </div>
    </section>
  );
}
