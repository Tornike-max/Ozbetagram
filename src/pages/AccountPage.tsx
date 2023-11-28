import { useSingleUserPost } from "../features/account/useSingleUserPost";
import { Button, useDisclosure } from "@nextui-org/react";
useSingleUserPost;
import {
  HiOutlineCheckBadge,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAccount } from "../features/posts/useGetAccount";
import ImageModal from "../ui/ImageModal";
import { useState } from "react";
import { useUser } from "../features/users/useUser";
import { useAllUsers } from "../features/users/useAllUsers";
import SpinnerComponent from "../ui/SpinnerComponent";
import { useDarkMode } from "../context/useDarkMode";
import ConfirmDeletion from "../ui/ConfirmDeletion";
import { useDeletePost } from "../features/posts/useDeletePost";

export default function AccountPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: user } = useUser();
  const { dark } = useDarkMode();
  const {
    isOpen: isModalOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { accountId } = useParams();

  const { deleteNotExistPosts: deletePost, isDeletingPost } =
    useDeletePost(accountId);

  const { users, isUsersLoading } = useAllUsers();

  const { data: post, isPending } = useGetAccount(accountId || user?.id || "");

  const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];

  const getRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  if (isPending || isUsersLoading || isDeletingPost)
    return <SpinnerComponent />;

  if (!post || !users) return;

  const singlePost = post[0];
  const currentUser = users?.find((user) => user?.id === accountId);

  const handleOpen = (id: number) => {
    const findImage = post.find((item) => item.id === id);
    onOpen();
    setImage(findImage.image);
    setName(findImage.caption);
  };

  function handleDeletePost(e: React.MouseEvent, id: number) {
    e.preventDefault();
    deletePost(id);
    // navigate("/posts");
  }
  const updatedUserName =
    user?.id === singlePost?.user_id && user?.user_metadata?.username;

  function handleDeleteModalOpen() {
    onDeleteOpen();
  }

  return (
    <div className="max-w-5xl w-full flex flex-col items-center justify-center font-serif px-2">
      {/* User Information Section */}
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        {/* Profile Avatar */}
        <div
          className={`${getRandomColorClass()} rounded-full text-white flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl font-semibold`}
        >
          {updatedUserName &&
            updatedUserName?.split(" ").map((item: string) => item[0])}
          {singlePost?.username.split(" ").map((item: string) => item[0]) ||
            currentUser.email
              .split(" ")
              .map((item: string) => item[0].toUpperCase())}
        </div>

        {/* User Details */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            className={`font-semibold flex items-center justify-center text-lg sm:text-xl ${
              dark && "text-white"
            }`}
          >
            <span>
              {updatedUserName || singlePost?.username || currentUser.email}
            </span>

            <span>
              <HiOutlineCheckBadge className="text-indigo-600 inline-block ml-1" />
            </span>
          </p>
          <span className={`text-sm sm:text-base ${dark && "text-slate-200"}`}>
            {singlePost?.users?.email || currentUser?.email}
          </span>
          <p className={`text-sm sm:text-base ${dark && "text-slate-200"}`}>
            {post.length > 0 && (
              <>
                <span className="text-indigo-500">{post.length}</span>
                <span> Post{post.length !== 1 && "s"}</span>
              </>
            )}
          </p>
        </div>

        {/* Edit & Delete Buttons */}
        {user?.id === accountId && (
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <Button
              variant="ghost"
              color="primary"
              onClick={() => navigate(`/edit/user/${user?.id}`)}
            >
              <HiOutlinePencil className="text-lg" />
              <span>Edit User</span>
            </Button>
            <Button
              variant="ghost"
              color="danger"
              onClick={() => handleDeleteModalOpen()}
            >
              <HiOutlineTrash className="text-lg" />
              <span>Delete User</span>
            </Button>
          </div>
        )}
      </div>

      {/* Confirm Deletion Modal */}
      {isModalOpen && (
        <ConfirmDeletion
          onClose={onDeleteClose}
          isOpen={isModalOpen}
          id={singlePost?.id}
        />
      )}

      {/* User Posts Section */}
      <div className="w-full border-t-[1px] border-slate-400 rounded-xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {post.map((item) => (
          <div key={item.id} className="relative flex justify-center">
            {/* Post Image */}
            <ImageModal
              isOpen={isOpen}
              onClose={onClose}
              image={image}
              name={name}
            />
            <img
              onClick={() => handleOpen(item?.id)}
              src={item.image}
              alt="Post image"
              loading="lazy"
              className="cursor-pointer rounded-xl hover:rounded-3xl duration-200 transition-all w-full h-auto sm:w-64 sm:h-56 object-cover"
            />
            {user?.id === accountId && (
              <button
                onClick={(e) => handleDeletePost(e, item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:p-[9px] duration-150 transition-all z-10 cursor-pointer"
              >
                <HiOutlineTrash />
              </button>
            )}
          </div>
        ))}
      </div>

      {!singlePost && (
        <div className="m-auto mt-4">
          <p className={`text-3xl text-center ${dark && "text-slate-100"}`}>
            No Posts Available
          </p>
        </div>
      )}
    </div>
  );
}
