import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EDocumentTypes } from "@interface/enums";
import { IActionError } from "@interface/app.interface";
import { IDocument } from "@interface/document.interface";
import { createDocumentAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createDocument"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | null;
      title: string;
      contentType: EDocumentTypes;
      isTemplate: boolean;
      description?: string;
      order?: number;
      imageUrl?: string;
      publicKeyId?: string;
      successCallBack?: (result: IDocument) => void;
      errorCallBack?: () => void;
    }) => {
      const {
        repoId,
        categoryId,
        order,
        title,
        description,
        contentType,
        isTemplate,
        imageUrl,
        publicKeyId,
      } = values;
      const response = await createDocumentAction(
        repoId,
        categoryId,
        title,
        contentType,
        isTemplate,
        description,
        order,
        imageUrl,
        publicKeyId,
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: async(response, values) => {
      const { successCallBack, categoryId } = values;
      const queryKey = [`category-${categoryId || "parent"}-children`];

      const cachedData = await queryClient.getQueriesData({ queryKey });
      const cachePages = cachedData?.[0]?.[1] as { pages: { list: IDocument[]; offset: number; size: number; total: number }[] };

      debugger;
      if (cachePages) {
        const newCategory = {
          ...response,
          createdAt: `${+new Date()}`,
          updatedAt: null,
          type: "document",
          newOne: true,
          name: values.title,
          order: values.order,
          isTemplate: values.isTemplate,
          contentType: values.contentType,
        };

        const newData = {
          ...cachePages,
          pages: cachePages.pages.map((page, index) => 
            {return index === 0 
              ? { ...page, list: [newCategory, ...page.list] } 
              : page;}
          )
        };

        queryClient.setQueriesData({ queryKey }, newData);
      }

      successCallBack?.(response);
    },
    onError: (error, values) => {
      const { errorCallBack } = values;
      toast.error(error.message || "خطای نامشخصی رخ داد");
      errorCallBack?.();
    },
  });
};

export default useCreateDocument;
