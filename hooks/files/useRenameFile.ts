import { renameFileAction } from "@actions/files";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useRenameFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["renameFile"],
    mutationFn: async (values: {
      resourceId: number;
      newName: string;
      hash: string;
      userGroupHash: string;
      callBack?: () => void;
    }) => {
      const { resourceId, newName, hash } = values;
      const response = await renameFileAction(resourceId, newName, hash);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, userGroupHash } = values;
      queryClient.invalidateQueries({
        queryKey: [`getFiles-${userGroupHash}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRenameFile;
