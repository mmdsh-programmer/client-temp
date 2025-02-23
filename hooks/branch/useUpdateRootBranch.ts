import { updateRootBranchAction } from "@actions/branch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUpdateRootBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-root-branch"],
    mutationFn: async (values: {
      name: string;
      username: string;
      callBack?: () => void;
    }) => {
      const { name, username } = values;
      const response = await updateRootBranchAction(name, username);
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

export default useUpdateRootBranch;
