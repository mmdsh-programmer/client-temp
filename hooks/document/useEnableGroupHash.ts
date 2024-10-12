import { useMutation } from "@tanstack/react-query";
import { IDocument } from "@interface/document.interface";
import { documentEnableUserGroupHashAction } from "@actions/document";
import { toast } from "react-toastify";

const useEnableGroupHash = () => {
  return useMutation({
    mutationKey: ["enable-user-group-hash"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId } = values;
      const response = await documentEnableUserGroupHashAction(
        repoId,
        documentId
      );
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      console.log("=============== enable user group --------------", response)
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEnableGroupHash;
