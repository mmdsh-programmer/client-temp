import { createTinyLinkAction } from "@actions/tinyLink";
import { IActionError } from "@interface/app.interface";
import { ITinyLinkResult } from "@interface/version.interface";
import { useMutation } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

export interface ITinyActionError {
  code: number;
  developerMessage: string;
  error: boolean;
  message: string;
  result: {
    hash: string;
    shortenObjectKind: string;
    urlOrContent: string;
    visitCount: number;
  } | null;
}

const useCreateTinyLink = () => {
  return useMutation({
    mutationKey: ["createTinyLink"],
    mutationFn: async (values: {
      url: string;
      callBack?: (result: ITinyLinkResult) => void;
    }) => {
      const { url } = values;
      const response = await createTinyLinkAction(url);
      handleClientSideHookError(response as IActionError);

      return (response as ITinyActionError).result as ITinyLinkResult;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateTinyLink;
