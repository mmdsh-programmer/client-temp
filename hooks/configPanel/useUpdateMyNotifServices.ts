import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateMyNotifServicesAction } from "@actions/configPanel";

const useUpdateMyNotifServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-my-notif-config"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      notificationServices?: string[];
      callBack?: () => void;
    }) => {
      const { repoId, notificationServices } = values;
      const response = await updateMyNotifServicesAction(
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

export default useUpdateMyNotifServices;
