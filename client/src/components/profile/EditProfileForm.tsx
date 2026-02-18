import { getUrl } from "@/utils/getImageUrl";
import { useMeQuery } from "@/utils/user";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "@/styles/authStyle.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER } from "@/graphql/mutations/user";
import { toast } from "react-toastify";
import { useState } from "react";

type EditForm = {
  username?: string;
  email?: string;
  description?: string;
  image?: FileList;
  banner?: FileList;
};

export default function EditProfileForm() {
  const selectedClassName = "border-b-blue-500 text-blue-500";
  const className =
    "cursor-pointer py-3 grow border-b border-gray-200 text-center hover:bg-gray-200";
  const { user } = useMeQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditForm>();
  const [image, setImage] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  const onSubmit = async (input: EditForm) => {
    await updateUser({
      variables: {
        input: {
          ...input,
          image: input.image?.[0],
          banner: input.banner?.[0],
        },
        id: user?.id,
      },
      refetchQueries: ["Me"],
    });
    if (error) toast.error(error.message);
  };

  return (
    <>
      <Tabs defaultIndex={0} defaultFocus={true}>
        <TabList className="flex border-y bg-white border-gray-200">
          <Tab selectedClassName={selectedClassName} className={className}>
            Profile Picture
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
                  src={image || (user?.image && getUrl(user?.image))}
                  alt={user?.username}
                  className="cursor-pointer w-36 h-36 rounded-full mx-auto bg-red-500"
                />
              </label>
              <input
                {...register("image", {
                  validate: (value) => {
                    const file = value?.[0];
                    if (!file) return true; // allow empty
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
                  src={banner || (user?.banner && getUrl(user?.banner))}
                  alt={user?.username}
                  className="cursor-pointer w-full h-full object-cover"
                />
              </label>
              <input
                {...register("banner", {
                  validate: (value) => {
                    const file = value?.[0];
                    if (!file) return true; // allow empty
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
            {/* Username */}
            <div className="details grid grid-cols-2 gap-x-4 space-y-4">
              <div className="username">
                <label htmlFor="username" className="auth-label">
                  Username
                </label>
                <input
                  {...register("username", {
                    minLength: {
                      value: 5,
                      message: "Minimum Length is 5",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum Length is 20",
                    },
                  })}
                  type="text"
                  defaultValue={user?.username}
                  className="auth-input px-4"
                />
                {errors?.username && (
                  <p className="auth-error-text">{errors?.username?.message}</p>
                )}
              </div>
              {/* Email */}
              <div className="email">
                <label htmlFor="email" className="auth-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Email",
                    },
                  })}
                  type="text"
                  defaultValue={user?.email}
                  className="auth-input px-4"
                />
                {errors?.email && (
                  <p className="auth-error-text">{errors?.email?.message}</p>
                )}
              </div>
              {/* Description */}
              <div className="description col-span-2">
                <label htmlFor="description" className="auth-label">
                  Description
                </label>
                <textarea
                  defaultValue={user?.description}
                  className="auth-input px-4 resize-none h-32"
                  {...register("description")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`main-button blue-button col-span-2 ${loading ? "cursor-not-allowed" : ""}`}
              >
                Update
              </button>
            </div>
          </TabPanel>
        </form>
      </Tabs>
    </>
  );
}
