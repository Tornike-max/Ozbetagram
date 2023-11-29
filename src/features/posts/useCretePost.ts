import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type PostType = {
  caption: string;
  image: File | string;
  location: string;
  tags: string;
  user_id: string;
  username: string;
};

export function useCreatePost() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: ({
      postDetails,
      postId,
    }: {
      postDetails: PostType;
      postId: number | string | undefined;
    }) => createPostApi({ postDetails, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
      navigate("/posts");
    },
    onError: () => {
      toast.error("Error creating post");
    },
  });

  return { createPost, isCreatingPost };
}
