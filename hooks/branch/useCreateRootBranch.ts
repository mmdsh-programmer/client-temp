import { createRootBranchAction } from "@actions/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateRootBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-root-branch"],
    mutationFn: async (values: {
      name: string;
      repoType: string;
      username: string;
      callBack?: () => void;
    }) => {
      const { name, repoType, username } = values;
      const response = await createRootBranchAction(name, repoType, username);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateRootBranch;
