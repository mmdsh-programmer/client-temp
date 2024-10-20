import { addUserToCategoryBlocklistAction } from "@actions/category";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useBlockCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({mutationKey: ["blockCategory"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number;
      username: string;
      type: "block" | "unblock";
      callBack?: () => void;
    }) => {
      const { repoId, categoryId, type, username } = values;
      const response = await addUserToCategoryBlocklistAction(
        repoId,
        categoryId,
        username,
        type
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, categoryId } = values;
      queryClient.invalidateQueries({queryKey: [`repo-${repoId}-category-${categoryId}-block-list`],});
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },});
};

export default useBlockCategory;
