import { getRepoSubscriptionAction } from "@actions/repository";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRepoSubscriptionStatus } from "@interface/repo.interface";

const useGetRepoSubscriptionStatus = (repoId: number, ssoId?: number) => {
  return useQuery({
    queryKey: [`repo-${repoId}-user-${ssoId}-subscription-status`],
    queryFn: async () => {
      const response = await getRepoSubscriptionAction(repoId);
      handleClientSideHookError(response as IActionError);
      return response as IRepoSubscriptionStatus;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!ssoId,
  });
};

export default useGetRepoSubscriptionStatus;
