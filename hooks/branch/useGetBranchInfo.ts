import { useQuery } from "@tanstack/react-query";
import { getBranchInfoAction } from "@actions/branch";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetBranchInfo = (branchId?: number) => {
  return useQuery({
    queryKey: ["branch", branchId],
    queryFn: async () => {
      const response = await getBranchInfoAction(branchId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    enabled: !!branchId,
  });
};

export default useGetBranchInfo; 