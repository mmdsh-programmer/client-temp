import { createTagAction } from "@actions/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTag"],
    mutationFn: async (values: {
      repoId: number;
      name: string;
      isDirectAccess?: boolean;
      callBack?: () => void;
    }) => {
      const { name, repoId, isDirectAccess } = values;
      const response = await createTagAction(repoId, name, isDirectAccess);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("tag:created");
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

export default useCreateTag;
