import { getAdminPanelReportAction } from "@actions/admin";
import { IClasorReport } from "@interface/clasorReport";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetAdminReport = () => {
  return useQuery({
    queryKey: ["getAdminReport"],
    queryFn: async () => {
      const response = await getAdminPanelReportAction();
      handleClientSideHookError(response as IActionError);
      return response as IClasorReport;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAdminReport;
