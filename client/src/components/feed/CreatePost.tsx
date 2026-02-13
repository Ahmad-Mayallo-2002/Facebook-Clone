import { CREATE_POST } from "@/graphql/mutations";
import type { CreatePostRes } from "@/interface/response";
import { useMeQuery } from "@/utils/user";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

interface FormProps {
  content?: string;
  media?: FileList;
}

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const { user, error } = useMeQuery();
  const { register, handleSubmit } = useForm<FormProps>();

  if (error) toast(error.message, { type: "error" });

  const [createPost, { loading, error: errPost }] =
    useMutation<CreatePostRes>(CREATE_POST);

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
        userId: user?.id,
      },
    });
  };

  if (errPost) console.log(errPost);

  return (
    <>
      <div className="panel center-y gap-x-3">
        <img src={user?.image.url} className="w-10 h-10 rounded-full" />
        <button
          onClick={() => setShow(true)}
          className="trigger text-start text-gray-500 cursor-pointer bg-gray-100 hover:bg-gray-200 py-2 px-4 w-full rounded-full"
        >
          What's on your mind?
        </button>
      </div>

      {show && (
        <>
          <span
            onClick={() => setShow(false)}
            className="fixed bg-black opacity-25 w-screen h-screen top-0 left-0 z-[1]"
          ></span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="dialog panel fixed max-w-100 w-full top-1/2 left-1/2 translate-[-50%] z-[2]"
          >
            <header className="center-y mb-2 justify-between">
              <h3 className="text-xl text-gray-900">Create Post</h3>
              <button
                onClick={() => setShow(false)}
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
              className={`blue-button main-button w-full mt-3 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Create Post
            </button>
          </form>
        </>
      )}
    </>
  );
}
