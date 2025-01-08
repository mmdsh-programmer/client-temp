import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { deleteAccessOfResourceAction } from "@actions/accessManagement";

const useDeleteAccessOfResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-access-of-resource"],
    mutationFn: async (values: {
      resourceId: number;
      accessNames: string[];
      username: string;
      validate: boolean;
      callBack?: () => void;
    }) => {
      const { resourceId, accessNames, username, validate } = values;
      const response = await deleteAccessOfResourceAction(
        resourceId,
        accessNames,
        username,
        validate
      );

      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, resourceId } = values;
      queryClient.invalidateQueries({
        queryKey: [`get-resource:${resourceId}-users`],
      });

      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteAccessOfResource;
