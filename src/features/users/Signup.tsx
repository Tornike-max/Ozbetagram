import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import SmallSpinner from "../../ui/SmallSpinner";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isPending } = useSignup();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("click");
    if (!data) return;
    signup({
      email: data?.email,
      password: data?.password,
      username: data?.username,
    });
  };
  return (
    <div className="flex flex-col items-center py-8 h-screen bg-slate-100">
      <div className="flex justify-center items-center m-auto pb-4">
        <img
          src="/logo-black.png"
          className="text-center text-indigo-600 font-bold w-72 h-24 rounded-2xl"
          alt="Logo"
        />
      </div>
      <div className="flex justify-center items-center">
        <form
          className="max-w-full sm:max-w-[300px] md:max-w-[400px] w-full space-y-2 bg-white rounded-lg py-4 px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center border-b-[1px] border-indigo-600">
            <p className="text-base">Personal Account</p>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              key={"username"}
              type="text"
              label="User Name"
              labelPlacement={"outside"}
              {...register("username", {
                required: "This field is required",
              })}
            />
            {errors?.username?.message && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              key={"email"}
              type="email"
              label="Email Address"
              labelPlacement={"outside"}
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors?.email?.message && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              key={"password"}
              label="Password"
              labelPlacement={"outside"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors?.password?.message && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              key={"repeatpassword"}
              label="Repeat Password"
              labelPlacement={"outside"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
              {...register("repeatPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords should match",
              })}
            />
            {errors?.repeatPassword?.message && (
              <p className="text-red-600">{errors.repeatPassword.message}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <button
              disabled={isPending}
              type="submit"
              className="py-2 px-3 w-full bg-indigo-600 rounded-md text-slate-100"
            >
              <p className="flex items-center px-2 justify-center">
                <span>{isPending ? <SmallSpinner /> : "Register"}</span>
              </p>
            </button>
            <button
              disabled={isPending}
              type="button"
              onClick={() => navigate("/login")} // Redirect to login page on button click
              className="py-2 px-3 bg-none border-indigo-600 border-[1.5px] rounded-md text-indigo-600"
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
