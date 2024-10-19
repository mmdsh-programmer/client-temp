import { deleteFileAction } from "@actions/files";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`renameFile`],
    mutationFn: async (values: {
      repoId: number;
      resourceId: number;
      fileHash: string;
      type: "private" | "public";
      userGroupHash: string;
      callBack?: () => void;
    }) => {
      const { resourceId, repoId, fileHash, type } = values;

      const response = await deleteFileAction(
        repoId,
        resourceId,
        fileHash,
        type
      );
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

export default useDeleteFile;
