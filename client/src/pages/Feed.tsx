import CreatePost from "@/components/feed/post/CreatePost";
import LeftSidebar from "@/components/feed/LeftSidebar";
import Posts from "@/components/feed/post/Posts";
import RightSidebar from "@/components/feed/RightSidebar";
import HeaderFeed from "@/components/headers/HeaderFeed";

export default function Feed() {
  return (
    <>
      <HeaderFeed />
      <div className="mt-[calc(12*4px+72px)]">
        <div className="container grid gap-4 lg:grid-cols-[300px_1fr_300px] grid-cols-1">
          <LeftSidebar />
          <main className="main-content">
            <CreatePost />
            <Posts />
          </main>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
