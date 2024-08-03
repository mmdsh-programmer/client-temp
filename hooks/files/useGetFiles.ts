import { getFileAction } from "@actions/files";
import { IPodspaceResult } from "@interface/app.interface";
import { IFile } from "@interface/file.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    queryKey: [`getFiles-${userGroupHash}`],
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

      return response?.data as {
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
