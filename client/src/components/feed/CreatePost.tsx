import { ME } from "@/graphql/queries";
import type { Me } from "@/interface/response";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const { data, error } = useQuery<Me>(ME);

  if (error) toast(error.message, { type: "error" });

  return (
    <>
      <div className="panel center-y gap-x-3">
        <img src={data?.me.image.url} className="w-10 h-10 rounded-full" />
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
            className="absolute bg-black opacity-25 w-screen h-screen top-[0px] -left-4 z-[1]"
          ></span>
          <form className="dialog panel absolute max-w-100 w-full top-1/2 left-1/2 translate-[-50%] z-[2]">
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
            ></textarea>

            <footer className="border rounded-lg border-gray-300 p-3 center-y justify-between">
              <h3 className="text-sm text-gray-900">Add To Your Post</h3>
              <label htmlFor="post-media" className="cursor-pointer">
                <FaImage className="text-2xl text-green-500" />
              </label>
              <input multiple={true} type="file" hidden id="post-media" />
            </footer>

            <button
              type="submit"
              className="blue-button main-button w-full mt-3"
            >
              Create Post
            </button>
          </form>
        </>
      )}
    </>
  );
}
