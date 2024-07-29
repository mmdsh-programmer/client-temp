import { createTagAction, editTagAction } from "@actions/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editTag"],
    mutationFn: async (values: {
      repoId: number;
      tagId: number;
      name: string;
      callBack?: () => void;
    }) => {
      const { name, repoId, tagId } = values;
      const response = await editTagAction(repoId, tagId, name);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId } = values;
      queryClient.invalidateQueries({
        queryKey: [`getTags-${repoId}`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditTag;
