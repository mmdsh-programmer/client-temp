import { IActionError } from "@interface/app.interface";
import { IClasorReport } from "@interface/clasor";
import { getAdminPanelReportAction } from "@actions/admin";
import { handleClientSideHookError } from "@utils/error";
import { useQuery } from "@tanstack/react-query";

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
