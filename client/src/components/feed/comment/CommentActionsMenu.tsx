import { DELETE_COMMENT } from "@/graphql/mutations/comment";
import { setOpenUpdateDialog } from "@/redux/slices/commentSlice";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface CommentActionsMenuProps {
  id: string;
}

export default function CommentActionsMenu({ id }: CommentActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();

  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: { id },
    refetchQueries: ["GetPostComments"],
  });

  const handleDelete = () => {
    deleteComment();
    setOpen(false);
  };

  if (error) toast.error(error.message);

  return (
    <>
      <div className="actions-comment relative w-8 h-8">
        <button
          onClick={handleOpen}
          className="w-full h-full center cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <HiDotsVertical />
        </button>
        {open && (
          <ul className="absolute bg-red-500 rounded-lg right-0 bg-white min-w-25 shadow-md">
            <li>
              <button
                onClick={handleDelete}
                className="cursor-pointer text-red-500 p-3 hover:bg-gray-100 w-full rounded-t-lg text-start"
              >
                Delete
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(!open);
                  dispatch(setOpenUpdateDialog(true));
                }}
                className="cursor-pointer p-3 hover:bg-gray-100 w-full rounded-b-lg text-start"
              >
                Update
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
