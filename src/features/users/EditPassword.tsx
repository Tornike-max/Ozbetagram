import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useEditUser } from "./useEditUser";

type UserDataType = {
  password: string;
  repeatPassword: string;
};

export default function EditPassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);

  const toggleVisibility1 = () => setIsVisible1(!isVisible1);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { editUser, isEditingUser } = useEditUser();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data: UserDataType) {
    if (!data) return;
    const { password } = data;
    editUser({ password, username: "", email: "" });
  }

  return (
    <>
      <h1 className="text-center font-bold text-indigo-500 text-3xl">
        Edit Account Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col gap-5 max-w-[600px] w-full"
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
          <Input
            key={"password"}
            label="New Password"
            labelPlacement={"outside"}
            className="text-lg max-w-lg rounded-lg border-[1px] border-slate-300"
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
            {...register("password", {
              required: "This field is required",
            })}
          />
          {errors?.password?.message && (
            <p className="text-red-600">{errors?.password?.message}</p>
          )}
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center ">
          <Input
            key={"repeatpassword"}
            label="Repeat Password"
            labelPlacement={"outside"}
            className="text-lg max-w-lg rounded-lg border-[1px] border-slate-300"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility1}
              >
                {isVisible1 ? (
                  <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register("repeatPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords should match",
            })}
          />
          {errors?.repeatPassword?.message && (
            <p className="text-red-600">{errors?.repeatPassword?.message}</p>
          )}
        </div>

        <Button
          disabled={isEditingUser}
          type="submit"
          size="lg"
          color="primary"
        >
          Edit Account Password
        </Button>
      </form>
    </>
  );
}
