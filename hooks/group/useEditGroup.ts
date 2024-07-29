import { editGroupAction } from "@actions/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editGroup"],
    mutationFn: async (values: {
      repoId: number | undefined;
      title: string;
      description?: string;
      members?: string[];
      callBack?: () => void;
    }) => {
      const { repoId, title, description, members } = values;
      const response = await editGroupAction(
        repoId,
        title,
        description,
        members
      );
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getRepoGroups-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditGroup;
