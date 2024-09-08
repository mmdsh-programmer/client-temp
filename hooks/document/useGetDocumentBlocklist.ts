import {
  getDocumentBlocklistAction,
} from "@actions/document";
import { IListResponse } from "@interface/repo.interface";
import { IUser } from "@interface/users.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDocumentBlocklist = (
  repoId: number,
  documentId: number,
  size: number
) => {
  return useInfiniteQuery({
    queryKey: [`repo-${repoId}-document-${documentId}-block-list`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getDocumentBlocklistAction(
        repoId,
        documentId,
        (pageParam - 1) * size,
        size
      );
      return response as IListResponse<IUser>;
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

export default useGetDocumentBlocklist;
