import { IAddVersion, IVersionMetadata } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IActionError } from "@interface/app.interface";
import { createVersionAction } from "@actions/version";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useCreateVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createVersion"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      versionNumber: string;
      content: string;
      outline: string;
      isDirectAccess?: boolean;
      onSuccessHandler?: () => void;
    }) => {
      const {
        repoId,
        documentId,
        versionNumber,
        content,
        outline,
        isDirectAccess,
      } = values;
      const response = await createVersionAction(
        repoId,
        documentId,
        versionNumber,
        content,
        outline,
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response as IAddVersion;
    },
    onSuccess: async (response, values) => {
      const { onSuccessHandler, repoId, documentId } = values;
      const queryKey = [`version-list-${repoId}-${documentId}`];
      const cachedData = await queryClient.getQueriesData({ queryKey });
      const cachePages = cachedData?.[0]?.[1] as {
        pages: {
          list: IVersionMetadata[];
          offset: number;
          size: number;
          total: number;
        }[];
      };
      if (cachePages) {
        const newVersion = {
          ...response,
          createDate: +new Date(),
          state: "draft",
          status: "editing",
          newOne: true,
        };

        const newData = {
          ...cachePages,
          pages: cachePages.pages.map((page, index) => {
            return index === 0
              ? { ...page, list: [newVersion, ...page.list] }
              : page;
          }),
        };

        queryClient.setQueriesData({ queryKey }, newData);
      }

      onSuccessHandler?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateVersion;
