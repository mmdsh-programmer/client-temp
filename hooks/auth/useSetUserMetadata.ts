import { userMetadataAction } from "@actions/auth";
import { IActionError } from "@interface/app.interface";
import { useMutation } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useSetUserMetadata = () => {
  return useMutation({
    mutationKey: ["setMetadata"],
    mutationFn: async (values: { data: object; callBack?: () => void }) => {
      const { data } = values;
      const response = await userMetadataAction(data);
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

export default useSetUserMetadata;
