import { sendFeedbackAction } from "@actions/feedback";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSendFeedback = () => {
  return useMutation({
    mutationKey: ["send-feedback"],
    mutationFn: async (values: {
      content: string;
      fileHashList: string[];
      callBack?: () => void;
    }) => {
      const { content, fileHashList } = values;
      const response = await sendFeedbackAction(content, fileHashList);
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

export default useSendFeedback;
