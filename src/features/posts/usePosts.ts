import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { useUser } from "../users/useUser";

export function usePosts() {
  const { data: user } = useUser();
  const { data, isPending, error } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => getPosts(user?.id || ""),
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data: data, isPending };
}
