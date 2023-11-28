import { useAllUsers } from "./useAllUsers";
import User from "./User";
import SpinnerComponent from "../../ui/SpinnerComponent";

export default function AllUsers() {
  const { users, isUsersLoading } = useAllUsers();

  if (isUsersLoading) return <SpinnerComponent />;
  return (
    <div className="grid-container ">
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
