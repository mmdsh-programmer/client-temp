import { addUserToFeedbackGroupHashAction } from "@actions/feedback";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddUserToFeedbackGroupHash = (callBack?: () => void) => {
  return useMutation({
    mutationKey: ["add-user-to-feedback-group-hash"],
    mutationFn: async () => {
      const response = await addUserToFeedbackGroupHashAction();
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
