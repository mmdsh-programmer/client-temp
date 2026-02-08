/* eslint-disable @typescript-eslint/no-explicit-any */
import { subscribeRepoAction } from "@actions/public";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRepo } from "@interface/repo.interface";

interface ISubscribeResult {
  repository: IRepo;
}
interface CustomError {
  message: string;
}

const useSubscribeRepo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["subscribe-repo"],
    mutationFn: async (values: {
      hash: string;
      password?: string;
      callBack?: (result) => void;
      errorCallBack?: (error?: number) => void;
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
      window.metrics?.track("repo:subscribe");

      const { errorCallBack } = values;

      const { message } = error as CustomError;
      const errorMsg = typeof message === "string" ? message : (message as any).message;
      toast.error( "خطای نامشخصی رخ داد");
      errorCallBack?.((message as any).repoId);
    },
  });
};

export default useSubscribeRepo;
