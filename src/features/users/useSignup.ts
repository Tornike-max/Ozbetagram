import { signup as signupApi } from "../../services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({
      email,
      username,
      password,
    }: {
      email: string;
      username: string;
      password: string;
    }) => signupApi({ email, username, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },

    onSettled: () => {
      navigate("/login");
    },
  });

  return { signup, isPending };
}
