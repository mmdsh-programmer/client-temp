import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { sampleCreateErrorAction } from "@actions/sampelError";
import { useMutation } from "@tanstack/react-query";

const useSampleError = () => {
  return useMutation({
    mutationKey: ["sample-error"],
    mutationFn: async (values: {
        onSuccess?: () => void;
        onError?: (error: IActionError) => void;
    }) => {
        console.log(values);
        const response = await sampleCreateErrorAction();
        handleClientSideHookError(response as IActionError);
        return response;
    },
    onSuccess: (response, values) => {
        values.onSuccess?.();
    },
    onError: (error, values) => {
      values.onError?.(error as unknown as IActionError);
    },
  });
};

export default useSampleError;
