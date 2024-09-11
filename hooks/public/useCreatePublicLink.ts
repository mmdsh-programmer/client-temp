import { createRepoPublicLinkAction } from "@actions/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreatePublicLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`repo-public`],
    mutationFn: async (values: {
      repoId: number;
      roleId: number;
      expireTime: number;
      password?: string;
      callBack?: () => void;
    }) => {
      const { repoId, roleId, expireTime, password } = values;
      const response = await createRepoPublicLinkAction(
        repoId,
        roleId,
        expireTime,
        password,
      );
      return response?.data;
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

export default useCreatePublicLink;
