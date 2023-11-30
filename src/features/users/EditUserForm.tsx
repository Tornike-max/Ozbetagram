import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "./useUser";
import { useEditUser } from "./useEditUser";
import { useGetSinglePost } from "./useGetSinglePost";
import SpinnerComponent from "../../ui/SpinnerComponent";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

type UserDataType = {
  username: string;
  email: string;
};

export default function EditUserForm({ username }: { username: string }) {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { editUser, isEditingUser } = useEditUser();
  const { isPending } = useGetSinglePost(user?.id || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataType>({
    defaultValues: {
      username: username || user?.user_metadata?.username,
      email: user ? user?.email : "",
    },
  });

  if (isPending) return <SpinnerComponent />;

  const onSubmit: SubmitHandler<UserDataType> = (data: UserDataType) => {
    if (!data) return;
    const { email, username } = data;
    editUser({ email, username });
  };

  const hasUsernameError = !!errors.username;
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Button
          onClick={() => navigate(-1)}
          color="default"
          type="button"
          variant="ghost"
        >
          <span>
            <HiOutlineArrowLeft />
          </span>
          Go Back
        </Button>
      </div>

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
