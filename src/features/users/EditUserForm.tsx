import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
import { useEditUser } from "./useEditUser";
import { useGetSinglePost } from "./useGetSinglePost";
import SpinnerComponent from "../../ui/SpinnerComponent";

type UserDataType = {
  username: string;
  email: string;
};

type OnSubmitType = {
  onSubmit(data: UserDataType): void;
};

export default function EditUserForm({ username }: { username: string }) {
  const { data: user } = useUser();
  const { editUser, isEditingUser } = useEditUser();
  const { data, isPending } = useGetSinglePost(user?.id || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username || user?.user_metadata?.username,
      email: user ? user?.email : "",
    },
  });

  if (isPending) return <SpinnerComponent />;

  function onSubmit(data: UserDataType) {
    if (!data) return;
    const { email, username } = data;
    editUser({ email, username });
  }

  const hasUsernameError = !!errors.username;
  return (
    <>
      <h1 className="text-center font-bold text-indigo-500 text-3xl">
        Edit User Data
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col gap-5 max-w-[600px] w-full"
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            disabled={true}
            variant="bordered"
            className="text-slate-600"
            defaultValue={user?.email}
            isInvalid={false}
            {...register("email", {
              required: "This Field is required",
            })}
          />
          {errors?.email?.message && (
            <p className="text-red-600">{errors?.email?.message}</p>
          )}
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            label="User Name"
            variant="bordered"
            isInvalid={hasUsernameError}
            {...register("username", {
              required: "This field is required",
            })}
          />
          {errors?.username?.message && (
            <p className="text-red-600">{errors?.username?.message}</p>
          )}
        </div>

        <Button
          disabled={isEditingUser}
          type="submit"
          size="lg"
          color="primary"
        >
          Edit User
        </Button>
      </form>
    </>
  );
}
