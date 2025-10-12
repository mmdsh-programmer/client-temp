import { repoPublicHashAction } from "@actions/files";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const usePublicFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["repoPublicFile"],
    mutationFn: async (values: {
      repoId: number;
      hashList: string[];
      userGroupHash: string;
      callBack?: () => void;
    }) => {
      const { repoId, hashList } = values;

      const response = await repoPublicHashAction(repoId, hashList);
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

export default usePublicFile;
