import { getKeyAction } from "@actions/repository";
import { useQuery } from "@tanstack/react-query";

const useGetKey = (repoId: number, keyId?: number) => {
  return useQuery({
    queryKey: [`repo-${repoId}-key-${keyId}-info`],
    queryFn: async ({ signal }) => {
      const response = await getKeyAction(repoId, keyId!);
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!keyId,
  });
};

export default useGetKey;
