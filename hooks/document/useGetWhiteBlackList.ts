import { useQuery } from "@tanstack/react-query";
import { getDocumentWhiteBlackListAction } from "@actions/document";
import { IWhiteList } from "@interface/document.interface";

const useGetWhiteBlackList = (repoId: number, documentId: number) => {
  return useQuery({
    queryKey: [`repo-${repoId}-document-${documentId}-white-list`],
    queryFn: async ({ signal }) => {
      const response = await getDocumentWhiteBlackListAction(
        repoId,
        documentId,
      );
      return response as IWhiteList;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetWhiteBlackList;
