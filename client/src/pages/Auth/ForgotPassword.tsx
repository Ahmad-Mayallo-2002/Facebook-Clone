import Logo from "@/components/logos/Logo";
import InputIcon from "@/components/ui/InputIcon";
import { FORGOT_PASSWORD } from "@/graphql/mutations";
import "@/styles/authStyle.css";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const navigate = useNavigate();

  const [forgot, { loading }] = useMutation(FORGOT_PASSWORD);

  const onSubmit = async (data: { email: string }) =>
    await forgot({
      variables: {
        email: data.email,
      },
    })
      .then(() => navigate("/verify-code"))
      .catch((reason) => toast.error(reason.message, { type: "error" }));

  return (
    <>
      <div className="center flex-col my-16">
        <Logo />
        <h3 className="my-3" id="auth-heading">
          Forgot Password?
        </h3>
        <p className="mb-4">Enter your email to receive a verification code</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-box">
          <div className="email">
            <label htmlFor="email" className="auth-label">
              Email Address <span>*</span>
            </label>
            <InputIcon
              icon={
                <MdMail className="absolute text-blue-500 left-4 text-2xl" />
              }
              placeholder="Enter Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />{" "}
            {errors.email && (
              <p className="auth-error-text">{errors.email.message}</p>
            )}
          </div>
          <button type="submit" className="mt-4 w-full main-button blue-button">
            {loading ? (
              <AiOutlineLoading3Quarters className="mx-auto animate-spin scale-[1.5] my-1" />
            ) : (
              "Send Verification Code"
            )}
          </button>
          <p className="text-gray-500 text-center mt-3">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </form>
        <Link to="/" className="mt-4 text-gray-600 hover:underline">
          Back To Home
        </Link>
      </div>
    </>
  );
}
