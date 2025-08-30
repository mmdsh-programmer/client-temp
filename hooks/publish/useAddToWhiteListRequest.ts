import { addToWhiteListRequestAction } from "@actions/publish";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useAddToWhiteListRequest = () => {
  return useMutation({
    mutationKey: ["add-to-whiteList-request"],
    mutationFn: async (values: { repoId: number; docId: number; callBack?: () => void }) => {
      const { repoId, docId } = values;
      const response = await addToWhiteListRequestAction(repoId, docId);
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

export default useAddToWhiteListRequest;
