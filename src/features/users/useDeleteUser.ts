import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isUserDeleting } = useMutation({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      navigate("/login");
    },
    onError: () => {
      toast.error("Can't delete user");
    },
  });

  return { deleteUser, isUserDeleting };
}
