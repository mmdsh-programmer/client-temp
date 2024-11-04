import { IActionError, TUserData } from "@interface/app.interface";

import { handleClientSideHookError } from "@utils/error";
import { useQuery } from "@tanstack/react-query";
import { userInfoAction } from "@actions/auth";

const useGetOptionalUser = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async ({ signal }) => {
      const response = await userInfoAction();
      handleClientSideHookError(response as IActionError);  
      return response as TUserData;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetOptionalUser;
