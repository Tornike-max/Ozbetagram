import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosts } from "../../services/apiPosts";

export function useDeletePost(userId = "") {
  const queryClient = useQueryClient();

  const { mutate: deleteNotExistPosts, isPending: isDeletingPost } =
    useMutation({
      mutationFn: (id: number) => deletePosts(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["getAccount", userId] });
        queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      },
    });

  return { deleteNotExistPosts, isDeletingPost };
}
