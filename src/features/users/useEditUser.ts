import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser as editUserApi } from "../../services/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isEditingUser } = useMutation({
    mutationFn: ({
      email,
      username,
      password,
    }: {
      email: string;
      username: string;
      password?: string;
    }) => editUserApi({ email, username, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("User has been updated");
      navigate(-1);
    },
    onError: () => {
      toast.error("User Failed to update");
    },
  });

  return { editUser, isEditingUser };
}
