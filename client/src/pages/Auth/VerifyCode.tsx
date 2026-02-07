import Logo from "@/components/logos/Logo";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { VERIFY_CODE } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "@/styles/authStyle.css";
import { useForm, Controller } from "react-hook-form";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [verify, { loading }] = useMutation(VERIFY_CODE);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
  });

  const handleVerify = async (data: { code: string }) =>
    await verify({
      variables: {
        code: data.code,
      },
    })
      .then(() => navigate("/update-password"))
      .catch((reason) => toast(reason.message, { type: "error" }));

  return (
    <div className="center w-screen h-screen flex-col">
      <Logo />
      <h3 id="auth-heading" className="my-3">
        Verify Code
      </h3>
      <p>We sent a 6-digit code to</p>
      <form
        onSubmit={handleSubmit(handleVerify)}
        action=""
        className="auth-box"
      >
        <Controller
          name="code"
          control={control}
          rules={{
            required: "Verification code is required",
            minLength: {
              value: 6,
              message: "Code must be 6 digits",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <PinInput
              inputClassName="grow"
              values={value ? value.split("") : Array.from("      ")}
              inputStyle={{
                borderColor: "black",
                backgroundColor: "white",
                boxShadow: "0 0 0 1px black",
                fontWeight: 700,
              }}
              onChange={(_value, _index, values) => onChange(values.join(""))}
            />
          )}
        />
        {errors.code && (
          <p className="auth-error-text">{errors.code.message}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className={`w-full my-3 main-button blue-button ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="mx-auto animate-spin scale-[1.5] my-1" />
          ) : (
            "Verify Code"
          )}
        </button>

        <p className="text-center text-gray-500">
          Didn't receive the code?{" "}
          <button className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}
