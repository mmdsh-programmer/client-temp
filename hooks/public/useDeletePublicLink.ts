import { deletePublicLinkAction } from "@actions/public";
import { IRoles } from "@interface/users.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useDeletePublicLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePublicLink"],
    mutationFn: async (values: {
      repoId: number;
      roleId: number;
      callBack?: (roleName?: string) => void;
    }) => {
      const { repoId, roleId } = values;
      const response = await deletePublicLinkAction(repoId, roleId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, roleId } = values;
      window.metrics?.track("repo:delete_public_link");

      const allRoles = queryClient.getQueryData(["getRoles"]) as IRoles[];

      const findRole = allRoles.find((role) => {
        return role.id === roleId;
      });

      queryClient.invalidateQueries({ queryKey: ["myRepoList-false"] });
      queryClient.invalidateQueries({ queryKey: ["allRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["accessRepoList"] });
      queryClient.invalidateQueries({ queryKey: ["myRepoList-false-isPublished"] });
      callBack?.(findRole?.name);
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useDeletePublicLink;
