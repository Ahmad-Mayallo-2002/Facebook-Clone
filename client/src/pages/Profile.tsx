import CreatePost from "@/components/feed/post/CreatePost";
import HeaderFeed from "@/components/headers/HeaderFeed";
import HeaderUserProfile from "@/components/headers/HeaderUserProfile";
import { useMeQuery } from "@/utils/user";
import UserPosts from "@/components/profile/UserPosts";
import UserFollowers from "@/components/profile/UserFollowers";
import UserFollowings from "@/components/profile/UserFollowings";

export default function Profile() {
  const { user } = useMeQuery();
  return (
    <>
      <HeaderFeed />
      <HeaderUserProfile />
      <div className="profile-container">
        <div className="container grid gap-4 md:grid-cols-[1fr_2fr] grid-cols-1">
          <div className="left-side">
            <UserFollowers user={user} />
            <UserFollowings user={user} />
          </div>
          <div className="right-side">
            <CreatePost />
            <UserPosts user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
