import { useQuery } from "@tanstack/react-query";
import { getPositionInfoAction } from "@actions/position";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IPositionInfo } from "@interface/position.interface";

const useGetPositionInfo = (branchId?: number, positionName?: string) => {
  return useQuery({
    queryKey: ["position", branchId, positionName],
    queryFn: async () => {
      const response = await getPositionInfoAction(branchId, positionName!);
      handleClientSideHookError(response as IActionError);
      return response as IPositionInfo;
    },
    enabled: !!branchId && !!positionName,
  });
};

export default useGetPositionInfo;
