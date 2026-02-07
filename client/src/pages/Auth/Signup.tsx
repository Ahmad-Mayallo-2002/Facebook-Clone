import Logo from "@/components/logos/Logo";
import "./authStyle.css";
import { Gender } from "@/enums/gender";
import Password from "@/components/ui/Password";
import { useForm } from "react-hook-form";
import InputIcon from "@/components/ui/InputIcon";
import { MdMail } from "react-icons/md";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "@/graphql/mutations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ISignUp {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignUp>();

  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(SIGNUP);

  const onSubmit = async (data: ISignUp) =>
    await signup({
      variables: {
        input: data,
      },
    })
      .then(() => navigate("/login"))
      .catch((reason) => {
        toast(reason.message, { type: "error" });
      });
  return (
    <div className="my-16 center flex-col">
      <div className="mx-auto w-fit">
        <Logo />
      </div>
      <h3 id="auth-heading" className="my-3">
        Create Account
      </h3>
      <p>Join Facebook and connect with friends</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth-box sign-up grid gap-4"
      >
        {/* Username */}
        <div className="username">
          <label htmlFor="username" className="auth-label">
            Username <span>*</span>
          </label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters",
              },
            })}
            placeholder="Enter Username"
            id="username"
            type="text"
            className="auth-input pl-4"
          />
          {errors.username && (
            <p className="auth-error-text">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="email">
          <label htmlFor="email" className="auth-label">
            Email Address
          </label>
          <InputIcon
            icon={<MdMail className="absolute text-blue-500 left-4 text-2xl" />}
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
            Password <span>*</span>
          </label>
          <Password
            placeholder="Enter Password"
            id="password"
            {...register("password", {
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
          {errors.password && (
            <p className="auth-error-text">{errors.password.message}</p>
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
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="auth-error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="gender">
          <label htmlFor="gender" className="auth-label">
            Gender <span>*</span>
          </label>
          <select
            id="gender"
            className="auth-input pl-4 text-gray-500"
            {...register("gender", {
              required: "Gender is required",
            })}
          >
            <option value="">Select Gender</option>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
          </select>
          {errors.gender && (
            <p className="auth-error-text">{errors.gender.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`main-button blue-button ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="mx-auto animate-spin scale-[1.5] my-1" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}
