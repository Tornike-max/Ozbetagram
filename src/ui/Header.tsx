import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useLogout } from "../features/users/useLogout";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";
import { Switch } from "@nextui-org/react";
import { useDarkMode } from "../context/useDarkMode";

export default function Header() {
  const { data } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const navigate = useNavigate();
  const { handleDarkToggle } = useDarkMode();

  return (
    <div className="flex justify-between items-center px-2 z-50">
      <img
        src="/logo.png"
        onClick={() => navigate(`/`)}
        className="text-slate-100 w-28 h-7 hover:text-indigo-600 transition-all duration-150 cursor-pointer"
      />
      <div className=" flex items-center">
        <Switch
          defaultSelected={false}
          size="sm"
          onChange={handleDarkToggle}
          color="primary"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <HiOutlineSun className={className} />
            ) : (
              <HiOutlineMoon className={className} />
            )
          }
        />
        <button
          disabled={isLoggingOut}
          onClick={() => logout()}
          className="text-slate-100 hover:bg-indigo-600 transition-all duration-150 py-2 px-3 rounded-lg text-2xl font-semibold"
        >
          <HiOutlineArrowRightOnRectangle />
        </button>
        <button
          onClick={() => navigate(`/account/${data?.id}`)}
          className="text-slate-100 hover:bg-indigo-600 transition-all duration-150 py-2 px-3 rounded-lg text-2xl font-semibold"
        >
          <HiOutlineUserCircle />
        </button>
      </div>
    </div>
  );
}
