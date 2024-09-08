import { transferOwnershipRepositoryAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useTranferOwnershipRepository = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`transferOwnershipRepo`],
    mutationFn: async (values: {
      repoId: number;
      userName: string;
      callBack?: () => void;
    }) => {
      const { userName, repoId } = values;
      const response = await transferOwnershipRepositoryAction(repoId, userName);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepo-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`allRepoList`],
      });
      queryClient.invalidateQueries({
        queryKey: [`bookmarkRepoList`],
      });
      queryClient.invalidateQueries({
        queryKey: [`myRepoList-false`],
      });
      queryClient.invalidateQueries({
        queryKey: [`accessRepoList`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useTranferOwnershipRepository;
