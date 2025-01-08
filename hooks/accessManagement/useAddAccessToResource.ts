import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { addAccessToResourceAction } from "@actions/accessManagement";

const useAddAccessToResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-access-to-resource"],
    mutationFn: async (values: {
      resourceId: number;
      accessNames: string[];
      username: string;
      cascadeToChildren: boolean;
      callBack?: () => void;
    }) => {
      const { resourceId, accessNames, username, cascadeToChildren } = values;
      const response = await addAccessToResourceAction(
        resourceId,
        accessNames,
        username,
        cascadeToChildren
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

export default useAddAccessToResource;
