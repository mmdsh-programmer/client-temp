import { getRepositoryAction } from "@actions/repository";
import { IRepo } from "@interface/repo.interface";
import { useQuery } from "@tanstack/react-query";

const useGetRepo = (repoId: number, setRepo: (repo: any) => void) => {
  return useQuery({
    queryKey: [`getRepo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getRepositoryAction(repoId);
      setRepo(response as IRepo);
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetRepo;
