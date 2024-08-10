import { createGroupAction } from "@actions/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-group"],
    mutationFn: async (values: {
      repoId: number;
      title: string;
      description?: string;
      members?: string[];
      callBack?: () => void;
    }) => {
      const { title, repoId, description, members } = values;
      const response = await createGroupAction(repoId, title, description, members);
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

export default useCreateGroup;
