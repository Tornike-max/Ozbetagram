import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/userApi";

export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
  });

  return { data, isPending, authenticated: data?.role === "authenticated" };
}
