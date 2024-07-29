import { createRepoAction } from "@actions/repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRepo"],
    mutationFn: async (values: {
      name: string;
      description?: string;
      callBack?: (result: any) => void;
    }) => {
      const { description, name } = values;
      const response = await createRepoAction( name, description);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: [`myRepoList-false`, `allRepoList`],
      });
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateRepo;
