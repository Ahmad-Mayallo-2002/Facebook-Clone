import { useState } from "react";
import { FaX } from "react-icons/fa6";
import CommentBox from "./CommentBox";
import { useLazyQuery } from "@apollo/client/react";
import { GET_POST_COMMENTS } from "@/graphql/queries";
import type { GetPostComments } from "@/interface/response";

export default function CommentsDialog({ postId }: { postId: string }) {
  const [show, setShow] = useState(false);

  const [getComments, { data, error, loading }] =
    useLazyQuery<GetPostComments>(GET_POST_COMMENTS);

  const handleOpen = () => {
    setShow(true);

    getComments({
      variables: {
        postId,
        take: 20,
        skip: 0,
      },
    });
  };

  return (
    <div className="comments-dialog">
      {/* Trigger */}
      <button
        className="trigger cursor-pointer text-gray-400"
        onClick={handleOpen}
      >
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
        <header className="center-y justify-between p-3 border-b border-gray-400">
          <h4 className="text-black">All Comments</h4>
          <button
            onClick={() => setShow(false)}
            className="rounded-full p-3 cursor-pointer hover:bg-gray-100 text-black"
          >
            <FaX />
          </button>
        </header>

        {data && (
          <ul className="p-3 space-y-4">
            {data?.getPostComments.data.map((comment) => (
              <li key={comment.id}>
                <CommentBox comment={comment} />
              </li>
            ))}
          </ul>
        )}

        {error && (
          <div className="w-full h-50 center">
            <h4>No Comments Yet.</h4>
          </div>
        )}

        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}
