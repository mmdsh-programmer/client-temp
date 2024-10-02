import { archiveRepoAction } from "@actions/repository";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-toastify";

const useArchiveRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["archiveRepo"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await archiveRepoAction(repoId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useArchiveRepo;
