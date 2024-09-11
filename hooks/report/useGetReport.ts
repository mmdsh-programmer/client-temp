import { getRepositoryReport } from "@actions/report";
import { useQuery } from "@tanstack/react-query";

const useGetReport = (repoId: number) => {
  return useQuery({
    queryKey: [`getReport-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getRepositoryReport(repoId);
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetReport;
