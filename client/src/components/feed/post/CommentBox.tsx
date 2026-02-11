import { mainEndPoint } from "@/assets/assets";
import type { Comment } from "@/interface/comment";

export default function CommentBox({ comment }: { comment: Comment }) {
  return (
    <div className="comment">
      <div className="author center-y gap-x-1 mb-2">
        <img
          className="w-5 h-5 rounded-full"
          src={
            comment.user?.image.public_id
              ? comment.user?.image.url
              : mainEndPoint + comment.user?.image.url
          }
          alt={comment.user?.username}
        />
        <h3 className="text-xs text-gray-900">{comment.user?.username}</h3>
      </div>
      <p className="text-gray-400">{comment.content}</p>
    </div>
  );
}
