import { getLikeAction } from "@actions/core";
import { IListResponse } from "@interface/repo.interface";
import {  ILikeList } from "@interface/version.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetLikeList = (postId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getLike-${postId}`, size],
    queryFn: async ({ pageParam }) => {
      const response = await getLikeAction(
        postId,
        (pageParam - 1) * size,
        size,
      );
      return response as IListResponse<ILikeList>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!postId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetLikeList;
