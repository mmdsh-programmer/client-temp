import { imageRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddImageToRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`imageRepo`],
    mutationFn: async (values: {
      repoId: number;
      fileHash: string | null;
      callBack?: () => void;
    }) => {
      const { fileHash ,repoId } = values;
      const response = await imageRepoAction(repoId,fileHash);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepo-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddImageToRepo;
