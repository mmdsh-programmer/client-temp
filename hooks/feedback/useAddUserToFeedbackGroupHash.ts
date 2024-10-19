import { addUserToFeedbackGroupHashAction } from "@actions/feedback";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddUserToFeedbackGroupHash = (callBack?: () => void) => {
  return useMutation({
    mutationKey: ["add-user-to-feedback-group-hash"],
    mutationFn: async () => {
      const response = await addUserToFeedbackGroupHashAction();
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useAddUserToFeedbackGroupHash;
