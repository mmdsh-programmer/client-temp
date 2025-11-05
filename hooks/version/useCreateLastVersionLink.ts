import { getLastVersionAction } from "@actions/version";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IVersion } from "@interface/version.interface";

const useCreateLastVersionLink = () => {
  return useMutation({
    mutationKey: ["create-last-version-link"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      isDirectAccess?: boolean;
      callBack?: (res: IVersion) => void;
    }) => {
      const { repoId, documentId, isDirectAccess } = values;
      const response = await getLastVersionAction(repoId, documentId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateLastVersionLink;
