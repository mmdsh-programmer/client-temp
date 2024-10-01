import { restoreRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useRestoreRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["restoreRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await restoreRepoAction(repoId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRestoreRepo;
