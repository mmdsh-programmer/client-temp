import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { createRepoTypesAction } from "@actions/repoType";

const useCreateRepoType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createRepoType"],
    mutationFn: async (values: {
      name: string;
      username?: boolean;
      callBack?: () => void;
    }) => {
      const { name  } = values;
      const response = await createRepoTypesAction(
        name,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["get-repo-types"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateRepoType;
