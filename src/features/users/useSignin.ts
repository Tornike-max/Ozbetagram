import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signinApi({ email, password }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success(`Welcome Back ${data.data.user.user_metadata.username}`);
      navigate(`/`);
    },
  });
  return { signin, isPending };
}
