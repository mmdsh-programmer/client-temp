import { getPublicFeedsAction } from "@actions/publicFeed";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetPublicFeeds = (domainId: number, offset: number, size: number) => {
  return useQuery({
    queryKey: [`getPublicFeeds-${domainId}`],
    queryFn: async () => {
      const response = await getPublicFeedsAction(domainId, offset, size);
      handleClientSideHookError(response as IActionError);
      return response;
    },
  });
};

export default useGetPublicFeeds; 