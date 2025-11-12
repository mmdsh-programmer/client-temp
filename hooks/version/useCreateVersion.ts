import { createVersionAction } from "@actions/version";
import { IActionError, IServerResult } from "@interface/app.interface";
import { IAddVersion, IVersionMetadata } from "@interface/version.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import axios from "axios";

// import { IActionError } from "@interface/app.interface";
// import { createVersionAction } from "@actions/version";
// import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";
// import { createVersion } from "@service/clasor";

const useCreateVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createVersion"],
    mutationFn: async (values: {
      accessToken?: string;
      repoId: number;
      documentId: number;
      versionNumber: string;
      content: string;
      outline: string;
      isDirectAccess?: boolean;
      username?: string;
      onSuccessHandler?: () => void;
      onErrorHandler?: () => void;
    }) => {
      const {
        accessToken,
        repoId,
        documentId,
        versionNumber,
        content,
        outline,
        isDirectAccess,
        username,
      } = values;
      if (!accessToken) {
        const response = await createVersionAction(
          repoId,
          documentId,
          versionNumber,
          content,
          outline,
          isDirectAccess,
        );

        handleClientSideHookError(response as IActionError);
        return response as IAddVersion;
      }

      const response = await axios.post<IServerResult<IAddVersion>>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/${repoId}/documents/${documentId}/versions`,
        { versionNumber, content, outline },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            isDirectAccess,
          },
        },
      );

      return response.data.data;
    },
    onSuccess: async (response, values) => {
      const { onSuccessHandler, repoId, documentId, username } = values;
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
          creator: { userName: username },
        };

        const newData = {
          ...cachePages,
          pages: cachePages.pages.map((page, index) => {
            return index === 0
              ? { ...{ ...page, total: page.total + 1 }, list: [newVersion, ...page.list] }
              : page;
          }),
        };

        queryClient.setQueriesData({ queryKey }, newData);
      }

      onSuccessHandler?.();
    },
    onError: (error, values) => {
      const { onErrorHandler } = values;
      toast.error(error.message || "خطای نامشخصی رخ داد");
      onErrorHandler?.();
    },
  });
};

export default useCreateVersion;
