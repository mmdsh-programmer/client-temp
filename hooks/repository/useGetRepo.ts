import { getRepositoryAction } from "@actions/repository";
import { IRepo } from "@interface/repo.interface";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

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
      handleClientSideHookError(response as IActionError);
      if (response as IRepo) {
        setRepo(response as IRepo);
        setRepositoryId(null);
        window.localStorage.setItem(
          "CLASOR:SELECTED_REPO",
          JSON.stringify(response)
        );
        return response as IRepo;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId && !!enabled,
  });
};

export default useGetRepo;
