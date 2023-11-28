import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/userApi";

export function useAllUsers() {
  const { data: users, isPending: isUsersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  if (isUsersLoading) {
    console.log("Pending users");
  }

  const userIds = users?.map((user) => user.id);

  return { users, isUsersLoading, userIds };
}
