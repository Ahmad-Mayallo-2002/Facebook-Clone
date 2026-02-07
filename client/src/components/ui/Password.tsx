import { useState, type InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLock } from "react-icons/md";

type PasswordProps = InputHTMLAttributes<HTMLInputElement>;

export default function Password({ ...props }: PasswordProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="input-icon relative center-y">
        <MdLock className="absolute text-blue-500 left-4 text-2xl" />
        <input
          className="auth-input pl-12"
          type={show ? "text" : "password"}
          {...props}
        />
        <button
          className="cursor-pointer absolute text-blue-500 bg-white right-4 text-2xl"
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </>
  );
}
