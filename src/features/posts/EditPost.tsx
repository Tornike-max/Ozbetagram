import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@nextui-org/button";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useUser } from "../users/useUser";
import { useEditPost } from "./useEditPost";
import { createPost } from "../../services/apiPosts";

interface FormData {
  files: File[];
}

type PostType = {
  post: object;
};

type FormTypes = {
  caption: string;
  file: File[];
  location: string;
  tags: string;
  image: string;
  user_id?: string;
};
export default function EditPost({ post }: PostType) {
  const { editPost, isEditing } = useEditPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormTypes>({
    defaultValues: {
      caption: post ? post.caption : "",
      location: post ? post.location : "",
      tags: post ? post.tags : "",
      user_id: post ? post.user_id : "",
      image: post ? post.image : "",
    },
  });
  const { data: currentUser } = useUser();

  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    // Update form values with dropped files
    setValue("files", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data) return;
    let image;
    if (data.files) {
      image = data.files[0];
    } else {
      image = data?.image;
    }

    if (!image) return;

    const newPost = {
      caption: data?.caption,
      tags: data?.tags,
      location: data?.location,
      image: image,
      user_id: currentUser?.id,
    };

    createPost({ ...newPost, image: image });
  };

  const files = watch("files");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-[500px] w-full"
    >
      <h1 className="text-2xl font-bold text-indigo-500 font-serif">
        Edit Post
      </h1>
      <div className="flex flex-col">
        <label className="text-slate-600 font-medium mb-1">Caption</label>
        <textarea
          className="bg-slate-200 hover:bg-slate-300 duration-150 transition-all rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("caption", {
            required: "This field is required",
          })}
        />
        {errors?.caption?.message && (
          <p className="text-red-500">{errors?.caption?.message}</p>
        )}
      </div>

      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-slate-200 hover:bg-slate-300 duration-150 transition-all"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {isDragActive ? (
          <div>
            {files.map((file) => (
              <span>{file && file.name}</span>
            ))}
          </div>
        ) : (
          <div className="max-w-[500px] w-full rounded-md py-16 px-10 flex flex-col justify-center items-center space-y-2">
            <span className="flex justify-center items-center">
              <HiOutlinePhoto className="text-indigo-400 sm:w-28 sm:h-28 w-20 h-20" />
            </span>
            <h3 className="text-indigo-600 font-medium text-base sm:text-lg">
              Drag Photo Here
            </h3>
            <p className="text-indigo-400 font-normal text-sm sm:text-base">
              SVG, PNG, JPEG
            </p>

            <Button color="primary" variant="ghost">
              Select from computer
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-slate-600 font-medium mb-1">
          Add Tags (Separated by comma " , ")
        </label>
        <input
          className="bg-slate-200 hover:bg-slate-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="TS,NextJs,React"
          {...register("tags", {
            required: "This field is required",
          })}
        />
        {errors?.tags?.message && (
          <p className="text-red-500">{errors?.tags?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-slate-600 font-medium mb-1">Location</label>
        <input
          className="bg-slate-200 hover:bg-slate-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          {...register("location", {
            required: "This field is required",
          })}
        />
        {errors?.location?.message && (
          <p className="text-red-500">{errors?.location?.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-slate-100"
        disabled={isEditing}
      >
        Edit Post
      </Button>
    </form>
  );
}
