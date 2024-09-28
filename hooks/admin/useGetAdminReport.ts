import { getAdminPanelReportAction } from "@actions/admin";
import { IClasorReport } from "@interface/clasorReport";
import { useQuery } from "@tanstack/react-query";

const useGetAdminReport = () => {
  return useQuery({
    queryKey: ["getAdminReport"],
    queryFn: async () => {
      const response = await getAdminPanelReportAction();
      return response as IClasorReport;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAdminReport;
