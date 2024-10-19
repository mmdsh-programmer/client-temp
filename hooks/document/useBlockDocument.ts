import { addUserToDocumentBlocklistAction } from "@actions/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useBlockDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["blockDocument"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      username: string;
      type: "block" | "unblock";
      callBack?: () => void;
    }) => {
      const { repoId, documentId, type, username } = values;
      const response = await addUserToDocumentBlocklistAction(
        repoId,
        documentId,
        username,
        type,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-document-${documentId}-block-list`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useBlockDocument;
