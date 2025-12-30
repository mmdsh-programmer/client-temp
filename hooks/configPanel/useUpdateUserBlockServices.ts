import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateUserBlockServicesAction } from "@actions/configPanel";

const useUpdateUserBlockServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-block-services"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      blockedServices: string[];
      callBack?: () => void;
    }) => {
      const { repoId, ssoId, blockedServices } = values;
      const response = await updateUserBlockServicesAction(repoId, ssoId, blockedServices);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      window.metrics?.track("repo:update_user_block_services");

      const { callBack, repoId, ssoId } = values;
      queryClient.invalidateQueries({ queryKey: [`getUserConfig-ssoId-${ssoId}-repoId-${repoId}`] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateUserBlockServices;
