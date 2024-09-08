import { saveVersionAction } from "@actions/editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSaveEditor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["saveVersion"],
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
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSaveEditor;
