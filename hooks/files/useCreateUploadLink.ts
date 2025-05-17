import { createUploadLinkAction } from "@actions/files";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateUploadLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createUploadLink"],
    mutationFn: async (values: {
      resourceId: number;
      userGroupHash: string;
      isPublic?: boolean;
      successCallBack?: (result: string) => void;
    }) => {
      const { resourceId, userGroupHash, isPublic } = values;
      const response = await createUploadLinkAction(resourceId, userGroupHash, isPublic);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { successCallBack, userGroupHash } = values;
      queryClient.invalidateQueries({
        queryKey: [`getFiles-${userGroupHash}`],
      });
      successCallBack?.(response.uploadHash);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateUploadLink;
