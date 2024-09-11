import { deleteRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await deleteRepoAction(repoId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`myRepoList-false`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteRepo;
