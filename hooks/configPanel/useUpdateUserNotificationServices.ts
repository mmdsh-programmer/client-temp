import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { updateUserNotificationServicesAction } from "@actions/configPanel";

const useUpdateUserNotificationServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-notification-services"],
    mutationFn: async (values: {
      repoId: number;
      ssoId: number;
      notificationServices: string[];
      callBack?: () => void;
    }) => {
      const { repoId, ssoId, notificationServices } = values;
      const response = await updateUserNotificationServicesAction(
        repoId,
        ssoId,
        notificationServices,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (_, values) => {
      const { callBack, repoId, ssoId } = values;
      queryClient.invalidateQueries({ queryKey: [`getUserConfig-ssoId-${ssoId}-repoId-${repoId}`] });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useUpdateUserNotificationServices;
