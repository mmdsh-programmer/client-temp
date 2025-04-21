import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableRepoChatAction } from "@actions/chat";
import { toast } from "react-toastify";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

export default function useEnableRepoChat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (values: {
      repoId: number;
      callBack?: (chatThreadId?: number) => void;
    }) => {
      const { repoId } = values;
      const response = await enableRepoChatAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response as {
        chatThreadId: number;
      };
    },
    onSuccess: (result, values) => {
      const { repoId, callBack } = values;
      
      // Invalidate the specific repo query to refresh it with the new chatThreadId
      queryClient.invalidateQueries({ queryKey: [`getRepo-${repoId}`] });
      
      // Invalidate all repo list queries to update them with the new chat-enabled repo
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      
      callBack?.(result.chatThreadId);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
}
