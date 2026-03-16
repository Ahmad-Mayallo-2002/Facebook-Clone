import { CREATE_PAGE } from "@/graphql/mutations/page";
import { defaultImages } from "@/utils/defaultImages";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

type CreatePageForm = {
  image?: FileList;
  banner?: FileList;
  description?: string;
};

export default function CreatePageDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(defaultImages.defaultUserMaleImage);
  const [banner, setBanner] = useState(defaultImages.defaultBannerImage);
  const { register, handleSubmit } = useForm<CreatePageForm>();

  const [createPage, { error, loading, data }] = useMutation(CREATE_PAGE);

  const handleOpenClose = () => setOpen(!open);
  const onSubmit = (input: CreatePageForm) => {
    createPage({
      variables: {
        input: {
          image: input?.image?.[0],
          banner: input?.banner?.[0],
          ...input,
        },
        userId,
      },
    });
  };

  if (error) toast.error(error.message);
  if (data) toast.success("Page created successfully");
  return (
    <>
      <div className="create-page-dialog">
        <button
          onClick={handleOpenClose}
          className="blue-button main-button py-2! cursor-pointer"
        >
          Create Page
        </button>

        {open && (
          <>
            <div onClick={handleOpenClose} className="backdrop"></div>
            <div className="dialog-content center-position rounded-lg">
              <header className="dialog-header p-3 rounded-t-lg center-y justify-between border-b border-gray-400">
                <h3 className="text-gray-900 text-2xl">Create Page</h3>
                <button
                  onClick={handleOpenClose}
                  className="cursor-pointer p-2 rounded-full hover:bg-gray-100"
                >
                  <FaX className="text-lg" />
                </button>
              </header>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 grid gap-4"
              >
                <div className="image-banner relative">
                  <div className="banner mb-8">
                    <label htmlFor="banner" className="cursor-pointer">
                      <img src={banner} alt="Banner" className="w-full h-30" />
                    </label>
                    <input
                      hidden
                      type="file"
                      id="banner"
                      {...register("banner", {
                        onChange(event) {
                          return (
                            event.target.files?.[0] &&
                            setBanner(
                              URL.createObjectURL(event.target.files[0]),
                            )
                          );
                        },
                      })}
                      accept="image/*"
                    />
                  </div>

                  <div className="image absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <label htmlFor="image" className="cursor-pointer">
                      <img
                        src={image}
                        alt="Image"
                        className="h-25 w-25 rounded-full"
                      />
                    </label>
                    <input
                      hidden
                      type="file"
                      id="image"
                      accept="image/*"
                      {...register("image", {
                        onChange(event) {
                          return (
                            event.target.files?.[0] &&
                            setImage(URL.createObjectURL(event.target.files[0]))
                          );
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="description">
                  <label htmlFor="description" className="auth-label">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter Page Description"
                    className="h-25 resize-none auth-input px-3"
                    {...register("description")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`blue-button main-button w-full py-2! ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
