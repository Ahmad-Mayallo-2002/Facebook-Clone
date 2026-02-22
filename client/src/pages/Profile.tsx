import CreatePost from "@/components/feed/post/CreatePost";
import HeaderFeed from "@/components/headers/HeaderFeed";
import HeaderUserProfile from "@/components/headers/HeaderUserProfile";
import UserPosts from "@/components/profile/UserPosts";
import UserFollowers from "@/components/profile/UserFollowers";
import UserFollowings from "@/components/profile/UserFollowings";
import UserPages from "@/components/profile/UserPages";
import { useParams } from "react-router-dom";
import { useMeQuery } from "@/utils/user";

export default function Profile() {
  const { userId } = useParams();
  const { user } = useMeQuery();
  return (
    <>
      <HeaderFeed />
      <HeaderUserProfile userId={userId || ""} />
      <div className="profile-container">
        <div className="container grid gap-4 md:grid-cols-[1fr_2fr] grid-cols-1">
          <div className="left-side">
            {user?.id === userId && <UserPages userId={userId || ""} />}
            <UserFollowers userId={userId || ""} />
            <UserFollowings userId={userId || ""} />
          </div>
          <div className="right-side space-y-4">
            {user?.id === userId && <CreatePost />}
            <UserPosts userId={userId || ""} />
          </div>
        </div>
      </div>
    </>
  );
}
