import { CREATE_COMMENT } from "@/graphql/mutations";
import type { CreateCommentRes } from "@/interface/response";
import { useMeQuery } from "@/utils/user";
import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";

type FormValues = {
  content: string;
};

interface Props {
  showComment: boolean;
  postId: string;
  setShowComment: Dispatch<SetStateAction<boolean>>;
}

export default function CreateComment({
  showComment,
  postId,
  setShowComment,
}: Props) {
  const [createComment, { loading }] =
    useMutation<CreateCommentRes>(CREATE_COMMENT);

  const { user } = useMeQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange", // updates isValid on change
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createComment({
        variables: {
          input: {
            content: values.content,
          },
          postId,
        },
      });
      reset();
      setShowComment(true);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div hidden={!showComment} className="write-comment p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="center-y gap-x-2">
        <div className="author">
          <img
            src={user?.image.url}
            className="w-12 h-10 rounded-full"
            alt=""
          />
        </div>

        <div className="w-full">
          <input
            placeholder="Write a comment..."
            className="py-2 px-3 bg-gray-100 w-full rounded-full"
            {...register("content", {
              required: "Comment content is required",
              validate: (value) =>
                value.trim() !== "" || "Comment cannot be empty",
            })}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="main-button blue-button !p-3 !rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
