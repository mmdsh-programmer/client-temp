import { useQuery } from "@tanstack/react-query";
import { getMyInfoAction } from "@actions/repository";
import { handleClientSideHookError } from "@utils/error";
import { IActionError, IMyInfo } from "@interface/app.interface";

const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["getMyInfo"],
    queryFn: async () => {
      const response = await getMyInfoAction();
      handleClientSideHookError(response as IActionError);
      return response as IMyInfo;
    },
    retry: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export default useGetMyInfo;
