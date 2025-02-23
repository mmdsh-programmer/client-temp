import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { rejectSubscriptionAction } from "@actions/domainSubscription";

const useRejectSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rejectSubscription"],
    mutationFn: async (values: {
      requestId: number;
      callBack?: () => void;
    }) => {
      const { requestId } = values;
      const response = await rejectSubscriptionAction(requestId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({ queryKey: ["domainSubscriptionList"] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useRejectSubscription;
