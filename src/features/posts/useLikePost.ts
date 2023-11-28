import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likedPost } from "../../services/apiPosts";

export function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate: updateLike, isPending: isUserLiking } = useMutation({
    mutationFn: ({
      newLikedObj,
      postId,
      userId,
    }: {
      newLikedObj: object;
      postId: number;
      userId: string;
    }) => likedPost(newLikedObj, postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { updateLike, isUserLiking };
}
