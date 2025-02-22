import { getFeedImagesAction } from "@actions/publicFeed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetFeedImages = (size: number) => {
  return useInfiniteQuery({
    queryKey: ["getFeedImages"],
    queryFn: async ({ pageParam }) => {
      const response = await getFeedImagesAction((pageParam - 1) * size, size);
      handleClientSideHookError(response as IActionError);
      return response;
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

export default useGetFeedImages;
