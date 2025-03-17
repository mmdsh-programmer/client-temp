import { setDocumentDomainTagsAction } from "@actions/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSetDocumentDomainTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["setDocumentDomainTags"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      tagIds: number[];
      callBack?: () => void;
    }) => {
      const { repoId, documentId, tagIds } = values;
      const response = await setDocumentDomainTagsAction(
        repoId,
        documentId,
        tagIds
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`document-${documentId}-info`],
      });
      callBack?.();
      toast.success("تگ‌های دامنه برای سند با موفقیت تنظیم شدند");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در تنظیم تگ‌های دامنه برای سند");
    },
  });
};

export default useSetDocumentDomainTags;
