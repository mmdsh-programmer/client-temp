import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { sampleCreateErrorAction } from "@actions/sampelError";
import { useQuery } from "@tanstack/react-query";

const useGetSampleError = () => {
  return useQuery({
    queryKey: ["sample-error"],
    queryFn: async () => {
      const response = await sampleCreateErrorAction();
      handleClientSideHookError(response as IActionError);
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetSampleError;
