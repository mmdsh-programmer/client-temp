import { useQuery } from "@tanstack/react-query";
import { getPositionInfoAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetPositionInfo = (branchId?: number, positionName?: string) => {
  return useQuery({
    queryKey: ["position", branchId, positionName],
    queryFn: async () => {
      const response = await getPositionInfoAction(branchId, positionName!);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    enabled: !!branchId && !!positionName,
  });
};

export default useGetPositionInfo; 