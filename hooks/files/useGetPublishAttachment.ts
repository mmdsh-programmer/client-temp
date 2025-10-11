import { getPublishAttachmentAction } from "@actions/files";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetPublishAttachment = (documentId: number, versionId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getPublishAttachmentAction-documentId-${documentId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishAttachmentAction(
        documentId,
        versionId,
        (pageParam - 1) * size,
        size,
      );

      handleClientSideHookError(response as IActionError);

      return response;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!documentId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.count / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishAttachment;
