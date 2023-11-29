import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/apiPosts";

export function useSingleUserPost(postId: number | string | undefined) {
  console.log(postId);
  const { data: singlePost, isPending: isGettingSinglePost } = useQuery({
    queryKey: ["usersPost", postId],
    queryFn: () => getSinglePost(postId),
  });

  return { singlePost, isGettingSinglePost };
}
