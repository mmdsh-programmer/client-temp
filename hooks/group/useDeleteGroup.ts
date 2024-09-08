import { deleteGroupAction } from "@actions/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteGroup"],
    mutationFn: async (values: {
      repoId: number;
      title: string
      callBack?: () => void;
    }) => {
      const { repoId, title } = values;
      const response = await deleteGroupAction(repoId, title);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, title } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepoGroups-${repoId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getGroup-${title}-repo-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeleteGroup;
