import { saveVersionAction } from "@actions/editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSaveEditor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-version-content"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      versionNumber: string;
      content: string;
      outline: string;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId, versionNumber, content, outline } =
        values;
      const response = await saveVersionAction(
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
      const { documentId, versionId, callBack } = values;

      console.log(
        "-------------------- save editor response ------------------",
        response
      );
      queryClient.invalidateQueries({
        queryKey: [
          `document-${documentId}-version-${versionId}-state-draft-innerDocument-true-innerOutline-true`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "document",
          documentId.toString(),
          "version",
          versionId.toString(),
          "state",
          "draft",
          "innerDocument",
          "true",
          "innerOutline",
          "true",
        ],
        exact: true,
        refetchType: "active",
      });
      // queryClient.invalidateQueries({
      //   queryKey: [`version-list-${repoId}-${documentId}`],
      // });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveEditor;
