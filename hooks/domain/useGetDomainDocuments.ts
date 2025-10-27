import { getDomainDocumentsAction } from "@actions/domain";
import { IDomainDocuments } from "@interface/domain.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDomainDocuments = (
  title: string,
  tagIds: number | number[] | undefined,
  creatorUserName: string | undefined,
  size,
) => {
  return useInfiniteQuery({
    queryKey: ["getDomainDocuments"],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDomainDocumentsAction(
        title,
        tagIds,
        creatorUserName,
        (pageParam - 1) * size,
        size,
      );
      return response as IDomainDocuments;
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

export default useGetDomainDocuments;
