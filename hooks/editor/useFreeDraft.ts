import {
 useMutation,
 useQueryClient
} from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { freeDraftVersionAction } from "@actions/editor";
import { toast } from "react-toastify";

const useFreeDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["freeDraftVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionNumber: string;
      content: string;
      outline: string;
      callBack?: () => void;
    }) => {
      const {
        repoId, documentId, versionId, versionNumber, content, outline
      } = values;
      const response = await freeDraftVersionAction(
        repoId,
        documentId,
        versionId,
        versionNumber,
        content,
        outline
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const {
 callBack, repoId, documentId 
} = values;
      queryClient.invalidateQueries({queryKey: [`version-list-${repoId}-${documentId}`],});

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useFreeDraft;
