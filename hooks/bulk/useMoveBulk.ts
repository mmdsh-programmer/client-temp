import { moveBulkAction } from "@actions/bulk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useMoveBulk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["moveBulk"],
    mutationFn: async (values: {
      repoId: number;
      parentId: number | null;
      children: number[];
      callBack?: () => void;
    }) => {
      const { repoId, parentId, children } = values;
      const response = await moveBulkAction(
        repoId,
        parentId,
        children,
      );
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, parentId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${parentId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useMoveBulk;
