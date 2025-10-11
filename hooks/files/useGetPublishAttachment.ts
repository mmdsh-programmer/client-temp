import { getPublishAttachmentAction } from "@actions/files";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IPublishAttachmentList } from "@interface/file.interface";

const useGetPublishAttachment = (documentId: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [`getPublishAttachmentAction-documentId-${documentId}`],
    queryFn: async ({ signal, pageParam }) => {
      const response = await getPublishAttachmentAction(documentId, (pageParam - 1) * size, size);

      handleClientSideHookError(response as IActionError);

      return response as IPublishAttachmentList;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!documentId,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetPublishAttachment;
