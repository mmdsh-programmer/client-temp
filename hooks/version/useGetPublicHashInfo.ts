import { useQuery } from "@tanstack/react-query";
import { getPublicHashInfoAction } from "@actions/version";
import { IVersion } from "@interface/version.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetPublicHashInfo = (publicHash: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [`get-public-hash-${publicHash}`],
    queryFn: async ({ signal }) => {
      const response = await getPublicHashInfoAction(publicHash);
      handleClientSideHookError(response as IActionError);
      return response as IVersion;
    },
    enabled: !!enabled && !!publicHash,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetPublicHashInfo;
