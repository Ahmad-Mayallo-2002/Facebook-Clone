import { CREATE_COMMENT } from "@/graphql/mutations/comment";
import type { CreateCommentRes } from "@/interface/response";
import { useMeQuery } from "@/utils/user";
import { useMutation } from "@apollo/client/react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

type FormValues = {
  content?: string;
  media?: FileList;
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

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    if (!values.content && (!values.media || !values.media.length)) {
      toast("Cannot create empty comment", { type: "error" });
      return;
    }

    const media = values?.media ? Array.from(values.media) : [];

    await createComment({
      variables: {
        input: {
          content: values.content,
          media,
        },
        postId,
      },
      refetchQueries: ["GetPostComments"],
    });
    reset();
    setShowComment(true);
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

        {/* Content */}
        <div className="w-full">
          <input
            placeholder="Write a comment..."
            className="py-2 px-3 bg-gray-100 w-full rounded-full"
            {...register("content")}
          />
        </div>

        {/* Media */}
        <button type="button" disabled={loading}>
          <label
            htmlFor="media"
            className="block main-button blue-button p-3! rounded-full! cursor-pointer"
          >
            <FaPlus />
          </label>
        </button>

        <input multiple type="file" hidden id="media" {...register("media")} />

        <button
          type="submit"
          disabled={loading}
          className="main-button blue-button p-3! rounded-full! cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
