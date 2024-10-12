
import { useQuery } from "@tanstack/react-query";
import { getMyInfoAction } from "@actions/repository";

const useGetMyInfo = () => {
  return useQuery({
    queryKey: ["getMyInfo"],
    queryFn: async () => {
      const response = await getMyInfoAction();
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetMyInfo;
