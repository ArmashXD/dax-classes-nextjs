import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../services/fetchProfile";

export const useProfile = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
    enabled: !id
  });

  return { data, error, isLoading };
};
