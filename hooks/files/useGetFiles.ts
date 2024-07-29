
import { getFileAction } from "@actions/files";
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

      console.log("----------------------- response ------------------", response)
      return response.result;
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

export default useGetFiles;
