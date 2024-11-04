import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { logoutAction } from "@actions/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async (values: { callBack?: () => void }) => {
      const response = await logoutAction();
      handleClientSideHookError(response as IActionError);
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useLogout;
