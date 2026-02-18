import CreatePost from "@/components/feed/post/CreatePost";
import HeaderFeed from "@/components/headers/HeaderFeed";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import { useMeQuery } from "@/utils/user";
import UserPosts from "@/components/profile/UserPosts";

export default function Profile() {
  const { user } = useMeQuery();
  return (
    <>
      <HeaderFeed />
      <UserProfileHeader />
      <div className="profile-container">
        <div className="container grid gap-4 md:grid-cols-[1fr_2fr] grid-cols-1">
          <div className="left-side">Follows and Pages</div>
          <div className="right-side">
            <CreatePost />
            <UserPosts user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
