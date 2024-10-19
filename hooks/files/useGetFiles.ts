import { getFileAction } from "@actions/files";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IFile, IPodspaceResult } from "@interface/file.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetFiles = (
  resourceId: number,
  userGroupHash: string,
  size: number,
  offset?: number,
  name?: string,
  order?: string,
  dataType?: string
) => {
  return useInfiniteQuery({
    queryKey: [`getFiles-${userGroupHash}`, name],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getFileAction(
        resourceId,
        userGroupHash,
        (pageParam - 1) * size,
        size,
        name,
        order,
        dataType
      );

      handleClientSideHookError(response as IActionError);

      return (
        response as IPodspaceResult<{
          list: IFile[];
          count: number;
        }>
      ).result as {
        list: IFile[];
        count: number;
      };
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.count / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetFiles;
