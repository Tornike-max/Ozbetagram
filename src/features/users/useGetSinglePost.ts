import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPosts";

export function useGetSinglePost(user_id: string) {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPost(user_id),
  });

  return { data, isPending };
}
