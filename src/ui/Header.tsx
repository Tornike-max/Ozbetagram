import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useLogout } from "../features/users/useLogout";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";

export default function Header() {
  const { data } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-4">
      <img
        src="/logo.png"
        onClick={() => navigate(`/`)}
        className="text-slate-100 text-xl w-32 h-7 hover:text-indigo-600 transition-all duration-150 cursor-pointer"
      />
      <div className="space-x-2">
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
