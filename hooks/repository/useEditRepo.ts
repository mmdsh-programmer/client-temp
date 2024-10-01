import { editRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editRepo"],
    mutationFn: async (values: {
      repoId: number;
      name: string;
      description: string;
      callBack?: () => void;
    }) => {
      const { description, name, repoId } = values;
      const response = await editRepoAction(repoId, name, description);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: [`getRepo-${repoId}`] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditRepo;
