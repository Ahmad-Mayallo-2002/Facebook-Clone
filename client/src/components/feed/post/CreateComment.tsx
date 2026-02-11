import { CREATE_COMMENT } from "@/graphql/mutations";
import type { CreateCommentRes } from "@/interface/response";
import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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

        reset(); // clear input after success
        setShowComment(true);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div hidden={!showComment} className="write-comment m-3 pb-3">
      <form onSubmit={handleSubmit(onSubmit)} className="center-y gap-x-2">
        <div className="author">
          {/* <img
            src={data?.me.image.url}
            className="w-14 h-10 rounded-full"
            alt=""
          /> */}
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
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="main-button blue-button !py-2 !px-3 !rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
