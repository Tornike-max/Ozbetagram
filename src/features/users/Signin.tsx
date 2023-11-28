import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../ui/SmallSpinner";
import { useSignin } from "./useSignin";

interface IFormInput {
  email: string;
  password: string;
}

export default function Signin() {
  const navigate = useNavigate();
  const { signin, isPending } = useSignin();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!data) return;
    signin({ email: data.email, password: data.password });
  };

  return (
    <div className="flex flex-col items-center py-24 sm:px-10 h-screen bg-slate-100">
      <div className="flex justify-center items-center m-auto">
        <img
          src="/logo-black.png"
          className="text-center text-indigo-600 font-bold w-72 h-24  rounded-2xl"
        />
      </div>
      <div className="flex justify-center items-center rounded-2xl">
        <form
          className="max-w-[300px] sm:max-w-[450px] space-y-2 bg-white rounded-lg py-4 px-6 sm:py-8 sm:px-10 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center border-b-[1px] border-indigo-600">
            <p className="text-base">Personal Account</p>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              key={"outside"}
              type="email"
              label="Email Address"
              labelPlacement={"outside"}
              {...register("email", {
                required: "This field is required",
                validate: (value) =>
                  value.includes("@") || "Email should include @",
              })}
            />
            {errors?.email?.message && <p>{errors.email.message}</p>}
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
            {errors?.password?.message && <p>{errors.password.message}</p>}
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <button
              disabled={isPending}
              type="submit"
              className="py-2 px-3 w-full bg-indigo-600 rounded-md text-slate-100"
            >
              <p className="flex items-center px-2 justify-center">
                <span> {isPending ? <SmallSpinner /> : "Login"}</span>
              </p>
            </button>
            <p className="text-center text-indigo-600 ">Forgotten password</p>
            <button
              disabled={isPending}
              type="button"
              onClick={() => navigate("/signup")}
              className="py-2 px-3 bg-none border-indigo-600 border-[1.5px] rounded-md text-indigo-600"
            >
              Create new personal account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
