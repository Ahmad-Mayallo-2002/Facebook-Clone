import { UPDATE_POST } from "@/graphql/mutations/post";
import type { CreatePostRes } from "@/interface/response";
import { useMutation } from "@apollo/client/react";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

interface FormProps {
  content?: string;
  media?: FileList;
}

export default function UpdatePost({
  setOpen,
  postId,
  pageId,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
  pageId?: string;
}) {
  const { register, handleSubmit } = useForm<FormProps>();

  const [createPost, { loading, error: errPost }] =
    useMutation<CreatePostRes>(UPDATE_POST);

  const onSubmit = (input: FormProps) => {
    if (!input.content && (!input.media || !input.media.length)) {
      toast("Cannot create empty post", { type: "error" });
      return;
    }

    const media = input.media ? Array.from(input?.media) : [];

    createPost({
      variables: {
        input: {
          content: input.content ?? undefined,
          media,
        },
        id: postId,
      },
      refetchQueries: pageId ? ["GetPagePosts"] : ["GetPosts"],
    });
  };

  if (errPost) console.log(errPost);

  return (
    <>
      <div onClick={() => setOpen(false)} className="backdrop"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dialog panel fixed max-w-100 w-full top-1/2 left-1/2 translate-[-50%] z-2"
      >
        <header className="center-y mb-2 justify-between">
          <h3 className="text-xl text-gray-900">Update Post</h3>
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-full duration-200"
          >
            <FaX />
          </button>
        </header>

        <textarea
          placeholder="What's on your mind?"
          className="h-48 w-full"
          {...register("content", {
            maxLength: {
              value: 5000,
              message: "Maximum character is 5000",
            },
            minLength: {
              value: 1,
              message: "Minimum character is 1",
            },
          })}
        ></textarea>

        <footer className="border rounded-lg border-gray-300 p-3 center-y justify-between">
          <h3 className="text-sm text-gray-900">Add To Your Post</h3>
          <label htmlFor="post-media" className="cursor-pointer">
            <FaImage className="text-2xl text-green-500" />
          </label>
          <input
            multiple
            {...register("media")}
            type="file"
            hidden
            id="post-media"
          />
        </footer>

        <button
          type="submit"
          disabled={loading}
          className={`blue-button main-button w-full mt-3 cursor-pointer`}
        >
          Update Post
        </button>
      </form>
    </>
  );
}
