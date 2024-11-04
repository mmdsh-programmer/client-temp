import { subscribeRepoAction } from "@actions/public";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRepo } from "@interface/repo.interface";

interface ISubscribeResult {
  repository: IRepo;
}

const useSubscribeRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["subscribe-repo"],
    mutationFn: async (values: {
      hash: string;
      password?: string;
      callBack?: (result) => void;
      errorCallBack?: () => void;
    }) => {
      const { hash, password } = values;
      const response = await subscribeRepoAction(hash, password);
      handleClientSideHookError(response as IActionError);
      return response as ISubscribeResult;
    },
    retry: false,
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response);
      queryClient.invalidateQueries({
        queryKey: ["getMyInfo"],
      });
    },
    onError: (error, values) => {
      const { errorCallBack } = values;
      errorCallBack?.();
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useSubscribeRepo;
