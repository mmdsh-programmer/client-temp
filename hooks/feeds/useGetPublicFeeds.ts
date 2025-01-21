import { getDomainPublicFeedsAction } from "@actions/feeds";
import { IActionError } from "@interface/app.interface";
import { IFeedItem } from "@interface/feeds.interface";
import { IListResponse } from "@interface/repo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";

const useGetPublicFeeds = (
  domainId: number,
  size: number,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: ["public-feeds"],
    queryFn: async ({ pageParam }) => {
      const response = await getDomainPublicFeedsAction(
        domainId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IFeedItem>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublicFeeds;
