import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiPosts";
import { useSearchParams } from "react-router-dom";

export function useGetAllPosts(userIds: string[] | undefined) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data: posts, isPending: isPostsLoading } = useQuery({
    queryKey: ["posts", "page", Number(page)],
    queryFn: () =>
      userIds ? getAllPosts(userIds, Number(page)) : Promise.resolve([]),
    enabled: !!userIds, // Only trigger the query when userIds are available
  });

  return { posts, isPostsLoading };
}
