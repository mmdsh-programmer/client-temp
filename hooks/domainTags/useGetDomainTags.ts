import { getAllDomainTagsAction } from "@actions/domain";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDomainTagList } from "@interface/domain.interface";

const useGetDomainTags = (size: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["domainTags", size],
    queryFn: async ({ pageParam }) => {
      const response = await getAllDomainTagsAction(
        (pageParam - 1) * size,
        size
      );
      handleClientSideHookError(response as IActionError);
      return response as IDomainTagList;
    },
    enabled: !!enabled,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    retry: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetDomainTags;
