import { editGroupAction } from "@actions/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useEditGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editGroup"],
    mutationFn: async (values: {
      repoId: number;
      title: string;
      description?: string;
      newTitle?: string;
      members?: string[];
      callBack?: () => void;
    }) => {
      const { repoId, title, description, members, newTitle } = values;
      const response = await editGroupAction(
        repoId,
        title,
        description,
        newTitle,
        members,
      );
      handleClientSideHookError(response as IActionError);
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

export default useEditGroup;
