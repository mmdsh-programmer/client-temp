import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createFormVersionAction } from "@actions/podForm";

const useCreateFormVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createFormVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionNumber: string;
      formType: "GENERAL" | "EXAM";
      formDisplay: "CLASSIC" | "CARD";
      isDirectAccess?: boolean;
      callBack?: () => void;
      onErrorHandler?: () => void;
    }) => {
      const { repoId, documentId, versionNumber, isDirectAccess, formType, formDisplay } = values;
      const response = await createFormVersionAction(
        repoId,
        documentId,
        versionNumber,
        formType,
        formDisplay,
        isDirectAccess,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${documentId}`],
      });
      callBack?.();
    },
    onError: (error, values) => {
      const { onErrorHandler } = values;

      toast.error(error.message || "خطای نامشخصی رخ داد");
      onErrorHandler?.();
    },
  });
};

export default useCreateFormVersion;
