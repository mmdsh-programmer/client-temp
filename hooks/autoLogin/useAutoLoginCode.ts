import { useMutation } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";
import { initiateAutoLoginAction } from "@actions/autoLogin";

const useAutoLoginCode = () => {
  return useMutation({
    mutationKey: ["autoLogin"],
    mutationFn: async (values: { callBack?: (url: string) => void }) => {
      const response = await initiateAutoLoginAction();
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response as string);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAutoLoginCode;
