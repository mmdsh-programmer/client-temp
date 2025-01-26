import { createRepoPublicLinkAction } from "@actions/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreatePublicLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["repo-public-link"],
    mutationFn: async (values: {
      repoId: number;
      roleId: number;
      expireTime: number;
      password?: string;
      callBack?: (result) => void;
    }) => {
      const {
 repoId, roleId, expireTime, password 
} = values;
      const response = await createRepoPublicLinkAction(
        repoId,
        roleId,
        expireTime,
        password
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: async (response, values) => {
      const { callBack, repoId } = values;
      // TODO: check these invalidate queries
      queryClient.invalidateQueries({ queryKey: [`getRepo-${repoId}`] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      callBack?.(response);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreatePublicLink;
