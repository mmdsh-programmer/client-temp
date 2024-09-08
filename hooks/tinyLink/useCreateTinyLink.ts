import { createTinyLinkAction } from "@actions/tinyLink";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateTinyLink = () => {
  return useMutation({
    mutationKey: [`createTinyLink`],
    mutationFn: async (values: { url: string; callBack?: (result: any) => void }) => {
      const { url } = values;
      const response = await createTinyLinkAction(url);
      return response?.data;
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
