import { addToDocumentBlackListAction } from "@actions/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddBlackList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-blacklist"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      usernameList: string[];
      callBack?: () => void;
    }) => {
      const { usernameList, repoId, documentId } = values;
      const response = await addToDocumentBlackListAction(
        repoId,
        documentId,
        usernameList,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("document:added_user_to_blacklist");
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-document-${documentId}-white-list`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddBlackList;
