import { addUserToRepoAction } from "@actions/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepoInviteRequestsByOwner-${repoId}`, repoId],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddUser;
