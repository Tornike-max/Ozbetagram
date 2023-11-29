/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@nextui-org/button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlinePhoto } from "react-icons/hi2";

export default function DropZone() {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentFile = acceptedFiles[0];
    setFile([currentFile]);

    const fileObjectURL = URL.createObjectURL(currentFile);
    setFileUrl(fileObjectURL);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image*/": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200 duration-150 transition-all"
    >
      <input type="file" {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>
          <img src={fileUrl} alt="Uploaded file" />
        </div>
      ) : file.length > 0 ? (
        <div>
          {/* Display any content you want when a file is already selected */}
          <p>File already selected.</p>
        </div>
      ) : (
        <div
          className={`max-w-[500px] w-full rounded-md py-16 px-10 flex flex-col justify-center items-center space-y-2 ${
            file.length > 0 || (fileUrl && "hidden")
          }`}
        >
          <span className="flex justify-center items-center">
            <HiOutlinePhoto className="text-indigo-400 sm:w-28 sm:h-28 w-20 h-20" />
          </span>
          <h3 className="text-indigo-600 font-medium text-base sm:text-lg">
            Drag Photo Here
          </h3>
          <p className="text-indigo-400 font-normal text-sm sm:text-base">
            SVG, PNG, JPEG
          </p>
          <Button type="button" color="primary" variant="ghost">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
