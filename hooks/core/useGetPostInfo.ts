import { useQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { IActionError, IPostInfo } from "@interface/app.interface";

const useGetPostInfo = (postId: number, enabled?: boolean) => {
  return useQuery({
    queryKey: [`post-${postId}-info`],
    queryFn: async ({ signal }) => {
      // const response = await getPostInfoAction(postId);
      // handleClientSideHookError(response as IActionError);
      // return response as IPostInfo[];
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetPostInfo;
