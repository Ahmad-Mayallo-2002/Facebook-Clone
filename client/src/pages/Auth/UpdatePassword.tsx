import Logo from "@/components/logos/Logo";
import Password from "@/components/ui/Password";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "@/styles/authStyle.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface UpdatePasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UpdatePasswordForm>();
  const navigate = useNavigate();
  const [reset, { loading }] = useMutation(RESET_PASSWORD);
  const email = useSelector((state: RootState) => state?.email.email);

  const onSubmit = async (data: UpdatePasswordForm) =>
    await reset({
      variables: {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        email,
      },
    })
      .then(() => navigate("/login"))
      .catch((reason) => toast(reason.message, { type: "error" }));

  return (
    <div className="center flex-col min-h-screen">
      <Logo />
      <h3 id="auth-heading" className="my-3">
        Update Password
      </h3>
      <p>Create a new password for your account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-box grid gap-4">
        {/* Password */}
        <div className="password">
          <label htmlFor="password" className="auth-label">
            Password <span>*</span>
          </label>
          <Password
            placeholder="Enter New Password"
            id="password"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="auth-error-text">{errors.newPassword.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="confirm-password">
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm Password <span>*</span>
          </label>
          <Password
            placeholder="Confirm Password"
            id="confirmPassword"
            className="auth-input pl-12"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="auth-error-text">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          disabled={loading}
          type="submit"
          className={`w-full main-button blue-button cursor-pointer`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="mx-auto animate-spin scale-[1.5] my-1" />
          ) : (
            "Update"
          )}
        </button>
      </form>
      <Link
        to="/login"
        className="center-y gap-x-1 hover:underline mt-4 text-gray-600"
      >
        <FaArrowLeft className="text-sm" /> Back To Login
      </Link>
    </div>
  );
}
