import { mainEndPoint, timeAgo } from "@/assets/assets";
import { useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import EmotionsDialog from "./post/EmotionsDialog";
import type { Post } from "@/interface/post";
import CommentsDialog from "./post/CommentsDialog";
import CreateComment from "./post/CreateComment";
import EmotionsBox from "./post/EmotionsBox";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { HiDotsVertical } from "react-icons/hi";
import type { User } from "@/interface/user";

interface PostProps {
  post: Post;
  user: User;
}

export default function Post({ post, user }: PostProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="post bg-white rounded-lg mt-4 shadow-sm">
      <header className="p-3 sm:p-4 post-author center-y justify-between">
        <div className="user center-y gap-x-2">
          <img
            src={
              user.image.public_id
                ? user.image.url
                : mainEndPoint + user.image.url
            }
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="username-date">
            <h4 className="text-gray-900 text-sm">{user.username}</h4>
            <small className="text-gray-500 text-xs">
              {timeAgo(post.createdAt)}
            </small>
          </div>
        </div>

        {post.userId === user?.id && (
          <div className="menu-actions relative w-10 h-10">
            <Menu
              menuButton={
                <button className="cursor-pointer rounded-full w-full h-full center hover:bg-gray-100">
                  <HiDotsVertical className="text-xl" />
                </button>
              }
              menuClassName="bg-white rounded-lg min-w-40 z-1 !left-[-120px]"
            >
              <MenuItem className="p-2 cursor-pointer hover:bg-gray-100 rounded-t-lg">
                Delete
              </MenuItem>
              <MenuItem className="p-2 cursor-pointer hover:bg-gray-100 rounded-b-lg">
                Update
              </MenuItem>
            </Menu>
          </div>
        )}
      </header>

      <section className="post-content">
        {post.content ? <p className="p-3 pt-0">{post.content}</p> : ""}
        {post.media && post.media.length
          ? post.media.map((m, i) => <img key={i} src={m.url} alt="Image" />)
          : null}
      </section>

      <footer className="post-actions mt-3">
        <div className="counts p-3 pt-0 center-y justify-between">
          <EmotionsDialog postId={post.id} />
          <CommentsDialog postId={post.id} />
        </div>

        <div
          className={`grid grid-cols-3 text-gray-600 border-gray-200 border-t ${!showComment ? "border-b" : ""}`}
        >
          <EmotionsBox postId={post.id} />
          <button
            onClick={() => setShowComment(!showComment)}
            className="center gap-x-1 p-3 cursor-pointer hover:bg-gray-100"
          >
            <FaRegComment />
            <span>Comment</span>
          </button>
          <button className="center gap-x-1 p-3 cursor-pointer hover:bg-gray-100">
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        <CreateComment
          setShowComment={setShowComment}
          postId={post.id}
          showComment={showComment}
        />
      </footer>
    </div>
  );
}
