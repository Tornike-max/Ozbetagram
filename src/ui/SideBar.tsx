import {
  HiMiniPhoto,
  HiOutlineArrowRightOnRectangle,
  HiOutlineHomeModern,
  HiOutlineMoon,
  HiOutlinePhoto,
  HiOutlineSun,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../features/users/useLogout";
import { useUser } from "../features/users/useUser";
import { Switch } from "@nextui-org/react";
import { useDarkMode } from "../context/useDarkMode";

export default function SideBar() {
  const { logout } = useLogout();
  const { data } = useUser();
  const { handleDarkToggle } = useDarkMode();
  const { pathname } = useLocation();

  return (
    <nav className="p-4">
      <ul className="flex flex-col items-start justify-center gap-8 ">
        <Link
          to={`/`}
          className="text-slate-50 font-semibold text-lg md:text-2xl cursor-pointer py-2 px-4 "
        >
          <li className="flex items-center gap-4">
            <img
              src="/logo.png"
              className="text-slate-50 w-52 h-18 flex items-center gap-4 font-serif"
            />
          </li>
        </Link>
        <li className="text-slate-50 font-semibold text-lg md:text-2xl cursor-pointer py-2 px-4">
          <Switch
            defaultSelected={false}
            size="lg"
            onChange={handleDarkToggle}
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <HiOutlineSun className={className} />
              ) : (
                <HiOutlineMoon className={className} />
              )
            }
          >
            <span className="text-slate-50 text-medium md:text-xl">
              {" "}
              Dark Mode
            </span>
          </Switch>
        </li>
        <Link
          to={`/account/${data?.id}`}
          className={`text-slate-50 font-semibold text-lg md:text-2xl cursor-pointer hover:bg-indigo-500 ${
            pathname === `/account/${data?.id}` && "bg-indigo-500"
          } py-2 px-4 rounded-md transition-all duration-150`}
        >
          <li className="flex items-center gap-4">
            <span>
              <HiOutlineUserCircle />
            </span>
            <span>My Account</span>
          </li>
        </Link>
        <Link
          to={`/`}
          className={`text-slate-50  font-semibold text-lg md:text-2xl cursor-pointer hover:bg-indigo-500 ${
            pathname === "/" && "bg-indigo-500"
          } py-2 px-4 rounded-md transition-all duration-150`}
        >
          <li className="flex items-center gap-4">
            <span>
              <HiOutlineHomeModern />
            </span>
            <span>Home</span>
          </li>
        </Link>
        <Link
          to="/posts"
          className={`text-slate-50  font-semibold text-lg md:text-2xl cursor-pointer hover:bg-indigo-500 ${
            pathname === "/posts" && "bg-indigo-500"
          } py-2 px-4 rounded-md transition-all duration-150`}
        >
          <li className="flex items-center gap-4">
            <span>
              <HiOutlinePhoto />
            </span>
            <span>Explore</span>
          </li>
        </Link>
        <Link
          to="/users"
          className={`text-slate-50  font-semibold text-lg md:text-2xl cursor-pointer hover:bg-indigo-500 ${
            pathname === "/users" && "bg-indigo-500"
          } py-2 px-4 rounded-md transition-all duration-150`}
        >
          <li className="flex items-center gap-4">
            <span>
              <HiOutlineUserGroup />
            </span>
            <span>Users</span>
          </li>
        </Link>

        <Link
          to="/createPost"
          className={`text-slate-50  font-semibold text-lg md:text-2xl cursor-pointer hover:bg-indigo-500 ${
            pathname === "/createPost" && "bg-indigo-500"
          } py-2 px-4 rounded-md transition-all duration-150`}
        >
          <li className="flex items-center gap-4">
            <span>
              <HiMiniPhoto />
            </span>
            <span>Create Post</span>
          </li>
        </Link>
        <li className="text-red-500 hover:text-slate-50 font-semibold text-lg md:text-2xl  cursor-pointer hover:bg-red-500 py-2 px-4 rounded-md transition-all duration-150">
          <button onClick={() => logout()} className="flex items-center gap-4">
            <span>
              <HiOutlineArrowRightOnRectangle />
            </span>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
