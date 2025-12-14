import { IActionError, IRepoResourceFilter } from "@interface/app.interface";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import { getRepoDocumentsAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetRepoDocuments = (
  repoId: number,
  size: number,
  filters: IRepoResourceFilter | null,
  reportType: "myResource" | "myAccessResource" | null,
  enabled: boolean,
) => {
  const queryKey: string[] = [];
  if (repoId) {
    queryKey.push(`repo-${repoId}-documents`);
  }
  if (reportType) {
    queryKey.push("personal-documents");
  }
  if (filters) {
    queryKey.push(`filters=${JSON.stringify(filters)}`);
  }
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      const response = await getRepoDocumentsAction(
        repoId,
        filters!.title,
        (pageParam - 1) * size,
        size,
        filters,
        reportType,
      );
      handleClientSideHookError(response as IActionError);
      return response as IListResponse<ICategoryMetadata | IDocumentMetadata>;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetRepoDocuments;
