import { mainEndPoint, timeAgo } from "@/assets/assets";
import { useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import EmotionsDialog from "./post/EmotionsDialog";
import type { Post } from "@/interface/post";
import CommentsDialog from "./post/CommentsDialog";
import CreateComment from "./post/CreateComment";
import EmotionsBox from "./post/EmotionsBox";

export default function Post({ user, createdAt, content, media, id }: Post) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="post bg-white rounded-lg mt-4 shadow-sm">
      <header className="p-3 sm:p-4 post-author">
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
              {timeAgo(createdAt)}
            </small>
          </div>
        </div>
      </header>

      <section className="post-content">
        {content ? <p className="p-3 pt-0">{content}</p> : ""}
        {media && media.length
          ? media.map((m, i) => <img key={i} src={m.url} alt="Image" />)
          : null}
      </section>

      <footer className="post-actions">
        <div className="counts p-3 pt-0 center-y justify-between">
          <EmotionsDialog postId={id} />
          <CommentsDialog postId={id} />
        </div>

        <div
          className={`grid grid-cols-3 text-gray-600 border-gray-200 border-t ${!showComment ? "border-b" : ""}`}
        >
          <EmotionsBox postId={id} />
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
          postId={id}
          showComment={showComment}
        />
      </footer>
    </div>
  );
}
