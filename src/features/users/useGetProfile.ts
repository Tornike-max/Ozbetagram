import { useQuery } from "@tanstack/react-query";
import { getAuthProfiles } from "../../services/apiProfile";

export function useGetProfile() {
  const { data, isPending } = useQuery({
    queryFn: () => getAuthProfiles(),
    queryKey: ["profile"],
  });

  return { data, isPending };
}
