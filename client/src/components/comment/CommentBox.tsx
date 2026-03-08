import { mainEndPoint, timeAgo } from "@/assets/assets";
import type { Comment } from "@/interface/comment";
import CommentActionsMenu from "./CommentActionsMenu";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import UpdateComment from "./UpdateComment";

interface CommentBoxProps {
  comment: Comment;
  authorId: string;
}

export default function CommentBox({ comment, authorId }: CommentBoxProps) {
  const src = comment.user?.image.public_id
    ? comment.user?.image.url
    : mainEndPoint + comment.user?.image.url;

  const openUpdateDialog = useSelector(
    (state: RootState) => state.comment.openUpdateDialog,
  );

  return (
    <div className="comment">
      <header className="center-y justify-between author">
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
        {authorId === comment.userId && <CommentActionsMenu id={comment.id} />}
      </header>
      <section className="content-and-media">
        <p className="text-gray-400 mb-3">{comment.content}</p>
        <div className="media flex flex-wrap gap-3">
          {comment.media && comment.media.length
            ? comment.media.map((media, index) => (
                <img
                  key={index}
                  src={media.url}
                  className="rounded-lg w-25 h-25"
                />
              ))
            : null}
        </div>
        {openUpdateDialog && <UpdateComment id={comment.id} />}
      </section>
    </div>
  );
}
