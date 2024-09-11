import { deletePublishLinkAction } from "@actions/publish";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeletePublishLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePublishLink"],
    mutationFn: async (values: { repoId: number; callBack?: () => void }) => {
      const { repoId } = values;
      const response = await deletePublishLinkAction(repoId);
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

export default useDeletePublishLink;
