import { getRepositoryReport } from "@actions/report";
import { IReport } from "@interface/repo.interface";
import { useQuery } from "@tanstack/react-query";

const useGetReport = (repoId: number) => {
  return useQuery({
    queryKey: [`getReport-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getRepositoryReport(
        repoId,
      );
      return response?.data as IReport;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetReport;
