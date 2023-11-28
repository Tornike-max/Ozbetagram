import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";

type UserType = {
  user: {
    username: string;
    email: string;
    id: string;
  };
};

export default function User({ user }: UserType) {
  const navigate = useNavigate();
  const { dark } = useDarkMode();

  const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];

  const getRandomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div
      className={`flex ${
        dark ? "bg-slate-800 hover:bg-slate-900" : "bg-white hover:bg-slate-100"
      }  shadow-lg justify-center items-center flex-col border-[1px] border-slate-300 rounded-lg py-6 gap-4 hover:shadow-2xl duration-150 transition-all`}
    >
      <span
        className={`${getRandomColorClass()} font-serif text-slate-100 rounded-full text-lg w-16 h-16 flex justify-center items-center`}
      >
        {user?.username?.split(" ").map((item: string) => item[0]) ||
          user?.email.split(" ").map((item: string) => item[0].toUpperCase())}
      </span>

      <h3
        className={`text-base font-semibold font-serif text-center  ${
          dark ? "text-slate-200" : "text-slate-500"
        }`}
      >
        {user.email}
      </h3>

      <Button
        onClick={() => navigate(`/account/${user.id}`)}
        variant="ghost"
        color="primary"
      >
        See User
      </Button>
    </div>
  );
}
