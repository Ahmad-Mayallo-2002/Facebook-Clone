import CreatePost from "@/components/post/CreatePost";
import Posts from "@/components/post/Posts";
import HeaderFeed from "@/components/headers/HeaderFeed";
import LeftSidebar from "@/components/feed/LeftSidebar";
import RightSidebar from "@/components/feed/RightSidebar";

export default function Feed() {
  return (
    <>
      <HeaderFeed />
      <div className="mt-36">
        <div className="container grid gap-4 lg:grid-cols-[300px_1fr_300px] grid-cols-1">
          <LeftSidebar />
          <main className="main-content space-y-4">
            <CreatePost />
            <Posts />
          </main>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
