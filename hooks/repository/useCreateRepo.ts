import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRepoAction } from "@actions/repository";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRepo } from "@interface/repo.interface";

const useCreateRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRepo"],
    mutationFn: async (values: {
      name: string;
      description?: string;
      callBack?: (result: IRepo) => void;
    }) => {
      const { description, name } = values;
      const response = await createRepoAction(name, description);

      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      window.metrics?.track("repo:created");
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["myRepoList-false"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allRepoList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myRepoList-false-isPublished"],
      });
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateRepo;
