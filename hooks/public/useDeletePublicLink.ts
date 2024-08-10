import { deletePublicLinkAction } from "@actions/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeletePublicLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePublicLink"],
    mutationFn: async (values: {
      repoId: number;
      roleId: number;
      callBack?: () => void;
    }) => {
      const { repoId, roleId } = values;
      const response = await deletePublicLinkAction(repoId, roleId);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepo-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePublicLink;
