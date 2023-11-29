import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import { useGetAllPosts } from "./useGetAllPosts";
import { useAllUsers } from "../users/useAllUsers";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  HiHeart,
  HiMagnifyingGlass,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiOutlinePencil,
} from "react-icons/hi2";
import { formatDate } from "../../ui/formatDate";
import { useLikePost } from "./useLikePost";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../users/useUser";
import { useState } from "react";
import ImageModal from "../../ui/ImageModal";
import { MAX_POST_PER_PAGE } from "../../constants";
import SpinnerComponent from "../../ui/SpinnerComponent";
import { useSearchPost } from "./useSearchPost";
import SmallSpinner from "../../ui/SmallSpinner";
import { useDarkMode } from "../../context/useDarkMode";

type PostType = {
  created_at: string;
  image: string;
  location: string;
  caption: string;
  id: number;
  user_id: string;
  username: string;
  tags: string;
  likes: [
    {
      user_id: string;
    }
  ];
  users: {
    email: string;
    user_id: string;
  };
};

export default function Posts() {
  const [searchVal, setSearchVal] = useState("");
  const { data, search, isSearching } = useSearchPost();
  const { dark } = useDarkMode();

  const navigate = useNavigate();
  const { updateLike } = useLikePost();
  const { data: user } = useUser();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { userIds, isUsersLoading } = useAllUsers();

  const { posts, isPostsLoading } = useGetAllPosts(userIds || undefined);

  isPostsLoading || (isSearching && <Spinner />);

  const likesList = posts?.data
    ?.map((post) => post?.likes)
    ?.map((item) => item?.used_id);

  const [like, setLike] = useState(likesList);

  const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];

  const getRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  if (isPostsLoading || isUsersLoading) return <SpinnerComponent />;

  const handleOpen = (
    e: React.MouseEvent,
    post: { image: string; caption: string }
  ) => {
    e.stopPropagation();
    onOpen();
    setImage(post?.image);
    setName(post?.caption);
  };

  function handleLike(e: React.MouseEvent, postId: number) {
    e.stopPropagation();
    const newLikes = [...(like || [])];

    const hasAlreadyLike = newLikes?.includes(user?.id);

    if (hasAlreadyLike) {
      newLikes?.filter((item) => item?.user_id !== user?.id);
    } else {
      newLikes?.push(user?.id);
    }
    setLike(newLikes);

    const newObj = {
      user_id: user?.id,
    };
    updateLike({ newLikedObj: newObj, postId: postId, userId: user?.id || "" });
  }

  function handleEdit(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    navigate(`/editPost/${id}`);
  }

  function handlePrev(e: React.MouseEvent, pageVal: number) {
    e.preventDefault();
    searchParams.set("page", String(Number(currentPage) - pageVal));
    setSearchParams(searchParams);
  }

  function handleNext(e: React.MouseEvent, pageVal: number) {
    e.preventDefault();
    searchParams.set("page", String(Number(currentPage) + pageVal));
    setSearchParams(searchParams);
  }

  function handleSearch(e: React.ChangeEvent, searchValue: string) {
    e.preventDefault();
    setSearchVal(searchValue);
    search({ searchValue });
  }

  const maxPosts = posts?.count;
  const lastPage = maxPosts && Math.abs(maxPosts / MAX_POST_PER_PAGE);
  const from = Number(currentPage - 1) * MAX_POST_PER_PAGE + 1;
  const to =
    Number(currentPage) === Number(lastPage)
      ? maxPosts
      : MAX_POST_PER_PAGE * Number(currentPage);

  const postData = data && data?.length > 0 ? data : posts?.data;

  return (
    <div className="flex flex-col items-center justify-center mx-8 gap-4">
      <div className="flex justify-start items-center flex-col cursor-pointer">
        <img
          src={`${dark ? "/logo.png" : "/logo-black.png"}`}
          className={`font-bold ${
            dark ? "bg-gray-800 px-2 py-2" : ""
          } w-80 h-20 rounded-2xl duration-200 transition-all`}
        />
      </div>

      <form className="flex items-center justify-center gap-2">
        <Input
          label="Search"
          isClearable
          type="search"
          value={searchVal}
          onChange={(e) => handleSearch(e, e.target.value)}
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <HiMagnifyingGlass className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button type="submit" size="lg" disabled={isSearching} color="primary">
          {isSearching ? <SmallSpinner /> : "Search"}
        </Button>
      </form>
      {Array.isArray(posts?.data) ? (
        postData?.map((post: PostType) => (
          <div
            key={post?.id}
            className={`max-w-2xl w-full rounded-lg p-4 my-4 cursor-pointer border ${
              dark ? "bg-gray-800 border-slate-900" : "bg-white border-gray-200"
            }`}
          >
            <Link
              to={`/account/${post?.user_id}`}
              className="flex items-start gap-4 pb-2"
            >
              <span
                className={`${getRandomColorClass()} text-slate-100 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center`}
              >
                {post?.username?.split(" ").map((item: string) => item[0])}
              </span>
              <div className="flex flex-col">
                <span
                  className={`text-base font-semibold ${
                    dark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {post?.username}
                </span>
                <span
                  className={`text-sm ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {post?.users?.email}
                </span>
                <span
                  className={`text-xs ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {formatDate(post.created_at)}
                </span>
              </div>
            </Link>

            <div className="relative overflow-hidden rounded-md mb-2 cursor-pointer">
              <LazyLoadImage
                src={post?.image}
                onClick={(e: React.MouseEvent) => handleOpen(e, post)}
                alt={post?.caption}
                className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-105"
              />
              <ImageModal
                isOpen={isOpen}
                onClose={onClose}
                image={image}
                name={name}
              />
            </div>

            <p className={`text-lg font-semibold ${dark && "text-slate-300"}`}>
              {post?.caption}
            </p>
            <p className={`text-gray-500 ${dark && "text-slate-300"}`}>
              {post?.location}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.split(",").map((tag: string, index: number) => (
                <span
                  key={index}
                  className={`text-xs bg-gray-200 rounded-md px-2 py-1`}
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">
              <div
                className={`flex items-center gap-1 border py-1 px-2 rounded-xl ${
                  dark
                    ? "border-red-500 bg-slate-50 hover:bg-slate-100 text-red-700 hover:text-red-500"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-700"
                } duration-200 transition-all`}
              >
                <span className="text-medium font-normal">
                  {!post?.likes?.length ? 0 : post.likes.length}
                </span>
                <span onClick={(e) => handleLike(e, post?.id)}>
                  {post?.likes?.find((item) => item?.user_id === user?.id) ? (
                    <HiHeart className="text-xl cursor-pointer text-red-600" />
                  ) : (
                    <HiOutlineHeart className="text-xl cursor-pointer text-red-500" />
                  )}
                </span>
              </div>
              {user?.id === post.user_id && (
                <button
                  onClick={(e) => handleEdit(e, post?.id)}
                  className={`flex items-center justify-center border py-1 px-2 rounded-xl hover:rounded-2xl ${
                    dark
                      ? "border-indigo-500 bg-slate-50 hover:bg-slate-100 text-indigo-500 hover:text-indigo-600"
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-700"
                  } duration-200 transition-all`}
                >
                  <HiOutlinePencil />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={`text-slate-300 ${dark && "text-slate-300"}`}>
          No Posts Available
        </div>
      )}

      {postData && (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-center gap-1 flex-col">
            <p className={`${dark && "text-slate-200"}`}>
              <span>Showwing </span>
              <span>{from} </span>
              <span>to {to} </span>
              <span>of {maxPosts} results</span>
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              disabled={Number(currentPage) === 1}
              variant="ghost"
              color="primary"
              onClick={(e) => handlePrev(e, 1)}
            >
              <p className="flex items-center justify-center gap-2">
                <span>
                  <HiOutlineArrowLeft />
                </span>
                <span>Previous</span>
              </p>
            </Button>
            <Button
              variant="ghost"
              disabled={Number(currentPage) >= Number(lastPage)}
              className="flex items-center justify-center"
              color="primary"
              onClick={(e) => handleNext(e, 1)}
            >
              <p className="flex items-center justify-center gap-2">
                <span>Next</span>
                <span>
                  <HiOutlineArrowRight />
                </span>
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
