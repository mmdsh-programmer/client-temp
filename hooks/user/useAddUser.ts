import { addUserToRepoAction } from "@actions/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (values: {
      repoId: number;
      username: string;
      accesName: string;
      callBack?: () => void;
    }) => {
      const { username, accesName, repoId } = values;
      const response = await addUserToRepoAction(repoId, username, accesName);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({queryKey: [`getRepoInviteRequestsByOwner-${repoId}`],});
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddUser;
