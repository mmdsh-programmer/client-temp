import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableDocChatAction } from "@actions/chat";
import { toast } from "react-toastify";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

export default function useEnableDocChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      repoId: number;
      docId: number;
      callBack?: (chatThreadId?: number) => void;
    }) => {
      const { repoId, docId } = values;
      const response = await enableDocChatAction(repoId, docId);
      handleClientSideHookError(response as IActionError);
      return response as {
        chatThreadId: number;
      };
    },
    onSuccess: (result, values) => {
      const { callBack, docId, repoId } = values;
      callBack?.(result.chatThreadId);
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${docId}-repo-${repoId}`],
      });
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
}
