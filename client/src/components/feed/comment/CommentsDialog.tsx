import { useState } from "react";
import { FaX } from "react-icons/fa6";
import CommentBox from "./CommentBox";
import { useLazyQuery } from "@apollo/client/react";
import type { GetPostComments } from "@/interface/response";
import { GET_POST_COMMENTS } from "@/graphql/queries/comment";
import { useDispatch } from "react-redux";
import { setOpenUpdateDialog } from "@/redux/slices/commentSlice";

interface CommentsDialogProps {
  postId: string;
  authorId: string;
}

export default function CommentsDialog({
  postId,
  authorId,
}: CommentsDialogProps) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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
      {show && (
        <>
          {/* Backdrop */}
          <div
            className="backdrop"
            onClick={() => {
              setShow(false);
              dispatch(setOpenUpdateDialog(false));
            }}
          ></div>
          {/* Content */}
          <div className="content dialog-content rounded-lg center-position">
            <header className="center-y justify-between p-3 border-b border-gray-400">
              <h4 className="text-black">All Comments</h4>
              <button
                onClick={() => setShow(false)}
                className="rounded-full p-3 cursor-pointer hover:bg-gray-100 text-black"
              >
                <FaX />
              </button>
            </header>

            {loading && !data && (
              <div className="h-75 w-full center">
                <div className="animate-spin border-4 border-t-transparent border-blue-500 w-16 h-16 rounded-full"></div>
              </div>
            )}

            {error && !data && (
              <div className="w-full h-75 center">
                <h4>{error.message}</h4>
              </div>
            )}

            {data && (
              <ul className="p-3 space-y-4 max-h-75 h-full overflow-y-auto">
                {data.getPostComments.data.map((comment) => (
                  <li key={comment.id}>
                    <CommentBox comment={comment} authorId={authorId} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
