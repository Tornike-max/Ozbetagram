import EditUserForm from "../features/users/EditUserForm";
import EditPassword from "../features/users/EditPassword";
import { useGetSinglePost } from "../features/users/useGetSinglePost";
import { useUser } from "../features/users/useUser";
import SpinnerComponent from "../ui/SpinnerComponent";
import { useDarkMode } from "../context/useDarkMode";

export default function EditUserPage() {
  const { data: user } = useUser();
  const { data, isPending } = useGetSinglePost(user?.id || "");
  const { dark } = useDarkMode();

  if (isPending) return <SpinnerComponent />;

  return (
    <div
      className={`max-w-5xl w-full ${
        dark ? "bg-gray-800" : "bg-slate-50"
      } duration-200 transition-all rounded-md py-10 px-20 flex justify-center items-center flex-col gap-4`}
    >
      <EditUserForm username={data.username} />
      <EditPassword />
    </div>
  );
}
