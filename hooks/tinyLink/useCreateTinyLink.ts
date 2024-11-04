import { createTinyLinkAction } from "@actions/tinyLink";
import { useMutation } from "@tanstack/react-query";
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
      callBack?: (result: any) => void;
    }) => {
      const { url } = values;
      const response = await createTinyLinkAction(url);

      if (response?.error) {
        const { message } = response;
        toast.error(message || "خطای نامشخصی رخ داد");
      } else {
        return response?.result;
      }
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.(response);
    },
    onError: () => {},
  });
};

export default useCreateTinyLink;
