import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/apiPosts";

export function useSingleUserPost(accountId: number) {
  console.log(accountId);
  const { data: singlePost, isPending: isGettingSinglePost } = useQuery({
    queryKey: ["usersPost", accountId],
    queryFn: () => getSinglePost(accountId),
  });

  return { singlePost, isGettingSinglePost };
}
