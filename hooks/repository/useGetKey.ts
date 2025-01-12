import { getKeyAction } from "@actions/repository";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IPublicKey } from "@interface/repo.interface";

const useGetKey = (repoId: number, keyId?: number) => {
  return useQuery({
    queryKey: [`repo-${repoId}-key-${keyId}-info`],
    queryFn: async ({ signal }) => {
      const response = await getKeyAction(repoId, keyId!);
      handleClientSideHookError(response as IActionError);
      return response as IPublicKey;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!keyId && repoId !== 0,
  });
};

export default useGetKey;
