import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateUserConfigPanelAction } from "@actions/configPanel";

const useUpdateUserConfigPanel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-config"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      blockedServices?: string[];
      notificationServices?: string[];
      allowedServices?: string[];
      callBack?: () => void;
    }) => {
      const { repoId, ssoId, allowedServices, blockedServices, notificationServices } = values;
      const response = await updateUserConfigPanelAction(
        repoId,
        ssoId,
        blockedServices,
        notificationServices,
        allowedServices,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack, repoId, ssoId } = values;
      queryClient.invalidateQueries({ queryKey: [`getUserConfig-${ssoId}`, repoId] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateUserConfigPanel;
