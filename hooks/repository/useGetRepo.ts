import { getRepositoryAction } from "@actions/repository";
import { IRepo } from "@interface/repo.interface";
import { useQuery } from "@tanstack/react-query";

const useGetRepo = (
  repoId: number | null,
  setRepo: (repo: IRepo) => void,
  setRepositoryId: (repoId: null | number) => void,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [`getRepo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getRepositoryAction(repoId);
      if (response) {
        setRepo(response);
        setRepositoryId(null);
        window.localStorage.setItem(
          "CLASOR:SELECTED_REPO",
          JSON.stringify(response)
        );
        return response;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!enabled,
  });
};

export default useGetRepo;
