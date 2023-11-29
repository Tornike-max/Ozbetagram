import AreaChartDashboard from "../features/home/AreaChartDashboard";
import { useGetAllPosts } from "../features/posts/useGetAllPosts";
import { useAllUsers } from "../features/users/useAllUsers";
import UserStat from "../features/home/UsersStat";
import { useUser } from "../features/users/useUser";
import { avatarURLs } from "./randomAvatars";
import SpinnerComponent from "./SpinnerComponent";
import { useDarkMode } from "../context/useDarkMode";

type UserType = {
  userId: string;
  id: number | string;
  email: string;
  status: keyof StatusTypes; // Ensure 'status' is one of the keys from StatusTypes
  avatar: string;
};

type StatusTypes = {
  active: string;
  paused: string;
  vacation: string;
};

export default function DashboardLayout() {
  const { data } = useUser();
  const { users: allUsers, userIds, isUsersLoading } = useAllUsers();
  const { dark } = useDarkMode();

  const { posts, isPostsLoading } = useGetAllPosts(userIds);

  if (isPostsLoading || isUsersLoading) return <SpinnerComponent />;

  const users: UserType[] =
    allUsers?.map((user, index) => {
      return {
        userId: user.id,
        id: Math.floor(Math.random() * 100),
        email: user?.email,
        status: user?.id === data?.id ? "active" : "paused", // Ensure 'status' matches keys in StatusTypes
        avatar: avatarURLs[index],
      };
    }) ?? [];

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-4 h-full py-2 sm:py-10">
      <div
        className={`h-full rounded-lg  w-full flex justify-center items-center flex-col ${
          dark ? "bg-gray-800 duration-150 transition-all" : "bg-slate-50"
        }`}
      >
        <h1 className="text-center font-bold text-lg sm:text-xl md:2xl text-indigo-600 py-6">
          Post Stats
        </h1>
        <AreaChartDashboard posts={posts} />
      </div>
      <div
        className={`h-full rounded-lg  w-full flex justify-center items-center  flex-col ${
          dark ? "bg-gray-800 duration-150 transition-all" : "bg-slate-50"
        }`}
      >
        <h1 className="text-center font-bold text-lg sm:text-xl md:2xl text-indigo-600 py-6">
          Users
        </h1>
        <UserStat users={users} columns={columns} />
      </div>
    </div>
  );
}
