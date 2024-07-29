import { deleteInviteRequestAction } from "@actions/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteInviteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteInviteRequest"],
    mutationFn: async (values: {
      repoId: number;
      userId: number;
      callBack?: () => void;
    }) => {
      const { userId, repoId } = values;
      const response = await deleteInviteRequestAction(repoId, userId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepoInviteRequestsByOwner-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteInviteRequest;
