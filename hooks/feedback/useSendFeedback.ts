import { sendFeedbackAction } from "@actions/feedback";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useSendFeedback = () => {
  return useMutation({
    mutationKey: ["send-feedback"],
    mutationFn: async (values: {
      content: string;
      fileHashList: { hash: string; fileName: string; fileExtension: string }[];
      callBack?: () => void;
    }) => {
      const { content, fileHashList } = values;
      const response = await sendFeedbackAction(content, fileHashList);
      handleClientSideHookError(response as IActionError);
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
