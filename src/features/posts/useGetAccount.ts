import { getAccountElements } from "../../services/apiPosts";
import { useQuery } from "@tanstack/react-query";

export function useGetAccount(userId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["getAccount", userId],
    queryFn: () => getAccountElements(userId),
  });

  return { data, isPending };
}
