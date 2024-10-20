import { TUserData } from "@interface/app.interface";
import { useQuery } from "@tanstack/react-query";
import { userInfoAction } from "@actions/auth";

const useGetOptionalUser = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async ({ signal }) => {
      debugger;
      const data = await userInfoAction();
      return data as TUserData;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetOptionalUser;
