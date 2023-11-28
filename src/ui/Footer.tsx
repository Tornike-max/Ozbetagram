import {
  HiMiniPhoto,
  HiOutlineHomeModern,
  HiOutlinePhoto,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <ul className="flex justify-around items-center h-10">
      <Link
        className="text-slate-50 flex flex-col justify-center items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-base cursor-pointer hover:bg-indigo-500 py-2 px-2 rounded-md transition-all duration-150"
        to={`/`}
      >
        <span>
          <HiOutlineHomeModern className="text-lg" />
        </span>
        <li>Home</li>
      </Link>
      <Link
        className="text-slate-50 flex flex-col justify-center items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-base cursor-pointer hover:bg-indigo-500 py-2 px-2 rounded-md transition-all duration-150"
        to="/posts"
      >
        <span>
          <HiOutlinePhoto className="text-lg" />
        </span>
        <li>Explore</li>
      </Link>
      <Link
        className="text-slate-50 flex flex-col justify-center items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-base cursor-pointer hover:bg-indigo-500 py-2 px-2 rounded-md transition-all duration-150"
        to="/createPost"
      >
        <span>
          <HiMiniPhoto className="text-lg" />
        </span>
        <li>Create Post</li>
      </Link>
      <Link
        className="text-slate-50 flex flex-col justify-center items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-base cursor-pointer hover:bg-indigo-500 py-2 px-2 rounded-md transition-all duration-150"
        to="/users"
      >
        <span>
          <HiOutlineUserGroup className="text-lg" />
        </span>
        <li>Users</li>
      </Link>
    </ul>
  );
}
