import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost as editPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";

type EditPostType = {
  caption: string;
  tags: string;
  location: string;
  image: string;
  user_id: string | undefined;
};

export function useEditPost() {
  const queryClient = useQueryClient();
  const { mutate: editPost, isPending: isEditing } = useMutation({
    mutationFn: ({
      newObj,
      postId,
    }: {
      newObj: EditPostType;
      postId: number;
    }) => editPostApi({ newObj, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      toast.error("Errow while edit post");
    },
  });
  return { editPost, isEditing };
}
