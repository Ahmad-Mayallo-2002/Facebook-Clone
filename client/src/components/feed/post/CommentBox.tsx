import { mainEndPoint, timeAgo } from "@/assets/assets";
import type { Comment } from "@/interface/comment";

export default function CommentBox({ comment }: { comment: Comment }) {
  const src = comment.user?.image.public_id
    ? comment.user?.image.url
    : mainEndPoint + comment.user?.image.url;

  return (
    <div className="comment">
      <div className="author center-y gap-x-3 mb-2">
        <img
          className="w-10 h-10 rounded-full"
          src={src}
          alt={comment.user?.username}
        />
        <div className="author-info">
          <h3 className="text-xs text-gray-900">{comment.user?.username}</h3>
          <small className="text-xs text-gray-400">
            {timeAgo(comment.createdAt)}
          </small>
        </div>
      </div>
      <p className="text-gray-400">{comment.content}</p>
    </div>
  );
}
