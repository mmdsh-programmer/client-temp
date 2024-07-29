import { useQuery } from "@tanstack/react-query";
import { getMe } from "@actions/auth";
import { TUserData } from "@interface/app.interface";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async ({ signal }) => {
      const data = await getMe();
      return data as TUserData;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetUser;
