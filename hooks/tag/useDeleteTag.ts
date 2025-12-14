import { deleteTagAction } from "@actions/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTag"],
    mutationFn: async (values: {
      repoId: number;
      tagId: number;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { repoId, tagId, isDirectAccess } = values;
      const response = await deleteTagAction(repoId, tagId, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("tag:deleted");
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getTags-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteTag;
