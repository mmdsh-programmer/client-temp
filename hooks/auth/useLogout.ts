import { logoutAction } from "@actions/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async (values: { callBack?: () => void }) => {
      const response = await logoutAction();
      return response;
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
