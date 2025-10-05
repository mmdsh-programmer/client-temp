import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getResponseListFormVersionAction } from "@actions/podForm";
import { IFormVersionResponseList } from "@interface/version.interface";

const useGetVersionResponse = (
  repoId: number,
  documentId: number,
  versionId: number,
  size: number,
) => {
  return useInfiniteQuery({
    queryKey: [`getVersionResponseList-${versionId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getResponseListFormVersionAction(
        repoId,
        documentId,
        versionId,
        (pageParam - 1) * size,
        size,
      );
      handleClientSideHookError(response as IActionError);
      return response as IFormVersionResponseList;
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

export default useGetVersionResponse;
