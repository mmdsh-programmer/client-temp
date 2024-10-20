import { userRoleEditAction } from "@actions/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useEditUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user-role"],
    mutationFn: async (values: {
      repoId: number;
      userName: string;
      roleName: string;
      callBack?: () => void;
    }) => {
      const { userName, roleName, repoId } = values;
      const response = await userRoleEditAction(repoId, userName, roleName);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepoUsers-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditUserRole;
