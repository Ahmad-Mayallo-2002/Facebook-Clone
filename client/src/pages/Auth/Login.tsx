import Logo from "@/components/logos/Logo";
import "@/styles/authStyle.css";
import { MdMail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import type { LoginRes } from "@/interface/response";
import Password from "@/components/ui/Password";
import InputIcon from "@/components/ui/InputIcon";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "@/graphql/mutations/auth";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const navigate = useNavigate();
  const [login, { loading }] = useMutation<LoginRes>(LOGIN);

  const onSubmit = async (input: ILogin) =>
    await login({ variables: { input } })
      .then(() => {
        navigate("/feed");
      })
      .catch((reason) => {
        toast(reason.message, { type: "error" });
        console.log(reason);
      });

  return (
    <div className="center w-screen h-screen">
      <section className="login auth-box">
        <div className="mx-auto w-fit">
          <Logo />
        </div>
        <h2 id="auth-heading" className="my-3">
          Welcome Back
        </h2>
        <p>Log in to continue to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4">
          {/* Email */}
          <div className="email">
            <label htmlFor="email" className="auth-label">
              Email Address
            </label>
            <InputIcon
              icon={
                <MdMail className="absolute text-blue-500 left-4 text-2xl" />
              }
              id="email"
              placeholder="Enter Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="auth-error-text">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="password">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <Password
              id="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="auth-error-text">{errors.password.message}</p>
            )}
          </div>
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
          <button
            disabled={loading}
            className={`main-button bg-blue-600 hover:bg-blue-700 text-white duration-200 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="mx-auto animate-spin scale-[1.5] my-1" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </section>
    </div>
  );
}
