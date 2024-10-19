import { getGroupInfoAction } from "@actions/group";
import { IGetGroup } from "@interface/group.interface";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetGroupInfo = (repoId: number, title: string) => {
  return useQuery({
    queryKey: [`getGroup-${title}-repo-${repoId}`],
    queryFn: async ({ signal }) => {
      const response = await getGroupInfoAction(repoId, title);
      handleClientSideHookError(response as IActionError);
      return response as IGetGroup;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!repoId,
  });
};

export default useGetGroupInfo;
