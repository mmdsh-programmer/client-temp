import {  cancelPublicVersionAction } from "@actions/version";
import { IAddVersion } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCancelPublicVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cancelPublicVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionId: number;
      callBack?: () => void;
    }) => {
      const { repoId, documentId, versionId } = values;
      const response = await cancelPublicVersionAction(
        repoId,
        documentId,
        versionId,
      );
      return response as IAddVersion;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, documentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-last-version-document-${documentId}-repo-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`version-list-${repoId}-${documentId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCancelPublicVersion;
