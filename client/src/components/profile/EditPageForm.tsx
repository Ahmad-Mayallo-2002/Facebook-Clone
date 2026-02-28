import { getUrl } from "@/utils/getImageUrl";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PAGE } from "@/graphql/mutations/page";
import { toast } from "react-toastify";
import { useState } from "react";
import type { Page } from "@/interface/page";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

type EditPageForm = {
  description?: string;
  image?: FileList;
  banner?: FileList;
};

export default function EditPageForm({ page }: { page?: Page }) {
  const selectedClassName = "border-b-blue-500 text-blue-500";
  const className =
    "cursor-pointer py-3 grow border-b border-gray-200 text-center hover:bg-gray-200";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPageForm>();
  const [image, setImage] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [updatePage, { loading, error }] = useMutation(UPDATE_PAGE);

  const onSubmit = async (input: EditPageForm) => {
    await updatePage({
      variables: {
        id: page?.id,
        input: {
          ...input,
          image: input.image?.[0],
          banner: input.banner?.[0],
        },
      },
      refetchQueries: ["GetPage"],
    });
    if (error) toast.error(error.message);
  };

  return (
    <>
      <Tabs defaultIndex={0} defaultFocus>
        <TabList className="flex border-y bg-white border-gray-200">
          <Tab selectedClassName={selectedClassName} className={className}>
            Page Picture
          </Tab>
          <Tab selectedClassName={selectedClassName} className={className}>
            Cover Picture
          </Tab>
          <Tab selectedClassName={selectedClassName} className={className}>
            Details
          </Tab>
        </TabList>
        <form onSubmit={handleSubmit(onSubmit)} className="panels p-4">
          <TabPanel>
            {/* Image */}
            <div className="profile-picture h-56 center">
              <label htmlFor="image">
                <img
                  src={image || (page?.image ? getUrl(page.image) : undefined)}
                  alt={page?.description}
                  className="cursor-pointer w-36 h-36 rounded-full mx-auto bg-red-500"
                />
              </label>
              <input
                {...register("image", {
                  validate: (value) => {
                    const file = value?.[0];
                    if (!file) return true;
                    if (!file.type.startsWith("image/"))
                      return "Invalid File Type. Accept Images Only";
                  },
                  onChange(event) {
                    const file = event.target.files?.[0];
                    if (file) setImage(URL.createObjectURL(file));
                  },
                })}
                type="file"
                hidden
                id="image"
                accept="image/*"
              />
              {errors?.image && (
                <p className="auth-error-text">{errors?.image?.message}</p>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            {/* Banner */}
            <div className="banner-picture h-56">
              <label htmlFor="banner">
                <img
                  src={
                    banner || (page?.banner ? getUrl(page.banner) : undefined)
                  }
                  alt={page?.description}
                  className="cursor-pointer w-full h-full object-cover"
                />
              </label>
              <input
                {...register("banner", {
                  validate: (value) => {
                    const file = value?.[0];
                    if (!file) return true;
                    if (!file.type.startsWith("image/"))
                      return "Invalid File Type. Accept Images Only";
                  },
                  onChange(event) {
                    const file = event.target.files?.[0];
                    if (file) setBanner(URL.createObjectURL(file));
                  },
                })}
                type="file"
                hidden
                id="banner"
                accept="image/*"
              />
              {errors?.banner && (
                <p className="auth-error-text">{errors?.banner?.message}</p>
              )}
            </div>
          </TabPanel>

          <TabPanel>
            {/* Description */}
            <div className="description col-span-2">
              <label htmlFor="description" className="auth-label">
                Description
              </label>
              <textarea
                defaultValue={page?.description}
                className="auth-input px-4 resize-none h-32"
                {...register("description")}
              />
            </div>
          </TabPanel>

          <button
            type="submit"
            disabled={loading}
            className={`main-button blue-button col-span-2 ${loading ? "cursor-not-allowed" : ""}`}
          >
            Update Page
          </button>
        </form>
      </Tabs>
    </>
  );
}
