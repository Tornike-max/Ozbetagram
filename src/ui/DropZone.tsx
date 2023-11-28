import { Button } from "@nextui-org/button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlinePhoto } from "react-icons/hi2";
export default function DropZone() {
  const [file, setFile] = useState([]);
  const [fileUrl] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image*/": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  // Disable click and keydown behavior on the <Dropzone>
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200 duration-150 transition-all"
    >
      <input type="file" {...getInputProps()} className="cursor-pointer" />
      {fileUrl.length > 1 ? (
        <div>
          <img src={fileUrl} />
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

          <Button type="button" color="primary" variant="ghost">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
