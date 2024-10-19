import { getRepositoryReport } from "@actions/report";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IReport } from "@interface/repo.interface";

const useGetReport = (repoId: number) => {
  return useQuery({
    queryKey: [`getReport-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getRepositoryReport(repoId);
      handleClientSideHookError(response as IActionError);
      return response as IReport;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetReport;
