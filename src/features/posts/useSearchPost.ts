import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchByCaption } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useSearchPost() {
  const queryClient = useQueryClient();
  const {
    mutate: search,
    isPending: isSearching,
    data,
  } = useMutation({
    mutationFn: ({ searchValue }: { searchValue: string }) =>
      searchByCaption(searchValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`posts`] });
    },
    onError: () => {
      toast.error("No Posts Found with this name");
    },
  });
  return { search, isSearching, data };
}
