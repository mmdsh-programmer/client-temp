import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateSelfConfigPanelAction } from "@actions/configPanel";

const useUpdateSelfConfigPanel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-self-config"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      notificationServices?: string[];

      callBack?: () => void;
    }) => {
      const { repoId, notificationServices } = values;
      const response = await updateSelfConfigPanelAction(
        repoId,
        notificationServices,
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

export default useUpdateSelfConfigPanel;
