import type { Comment } from "@/interface/comment";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import CommentBox from "./CommentBox";

export default function CommentsDialog({ comments }: { comments: Comment[] }) {
  const [show, setShow] = useState(false);

  return (
    <div className="comments-dialog">
      {/* Trigger */}
      <button className="trigger cursor-pointer" onClick={() => setShow(!show)}>
        45 Comments
      </button>
      {/* Backdrop */}
      <div
        className="backdrop"
        hidden={!show}
        onClick={() => setShow(false)}
      ></div>
      {/* Content */}
      <div
        className="content dialog-content rounded-lg center-absolute max-h-[300px] overflow-y-auto"
        hidden={!show}
      >
        <header className="center-y justify-between p-3">
          <h4 className="text-black">All Comments</h4>
          <button
            onClick={() => setShow(false)}
            className="rounded-full p-3 cursor-pointer hover:bg-gray-100 text-black"
          >
            <FaX />
          </button>
        </header>

        <hr />

        <ul className="p-3 space-y-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentBox comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
