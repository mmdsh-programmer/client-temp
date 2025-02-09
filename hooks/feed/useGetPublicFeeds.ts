import { getPublicFeedsAction } from "@actions/publicFeed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IListResponse } from "@interface/repo.interface";
import { IFeedItem } from "@interface/feeds.interface";

const useGetPublicFeeds = (size: number) => {
  return useInfiniteQuery({
    queryKey: ["public-feeds"],
    queryFn: async ({ pageParam }) => {
      const response = await getPublicFeedsAction(
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<IFeedItem>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublicFeeds;
