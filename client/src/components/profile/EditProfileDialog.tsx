import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import UpdateProfileForm from "./UpdateProfileForm";

export default function EditProfileDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="profile-actions">
        <button
          onClick={handleOpen}
          className="profile-edit-btn center-y cursor-pointer gap-x-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-semibold"
        >
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </div>

      {open && (
        <>
          <div className="backdrop" onClick={handleOpen}></div>
          <div className="dialog-content center-position rounded-lg">
            <header className="p-3 center-y justify-between">
              <h3 className="text-gray-900 text-xl font-semibold">
                Update Profile
              </h3>
              <button
                onClick={handleOpen}
                className="cursor-pointer w-10 h-10 center rounded-full hover:bg-gray-200"
              >
                <FaX />
              </button>
            </header>

            <UpdateProfileForm />
          </div>
        </>
      )}
    </>
  );
}
