import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getUserConfigPanelAction } from "@actions/configPanel";
import { IUserConfigPanel } from "@interface/users.interface";

const useGetUserConfigPanel = (repoId: number, ssoId?: number) => {
  return useQuery({
    queryKey: [`getUserConfig-${ssoId}`, repoId],
    queryFn: async () => {
      const response = await getUserConfigPanelAction(repoId, ssoId);
      handleClientSideHookError(response as IActionError);
      return response as IUserConfigPanel[];
    },
    enabled: !!repoId,
  });
};

export default useGetUserConfigPanel;