import { createDocumentTemplateAction } from "@actions/document";
import { IDocument } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateDocumentTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createDocument"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | null;
      title: string;
      contentType: EDocumentTypes;
      versionNumber: string;
      templateId: number;
      description?: string;
      order?: number;
      imageUrl?: string;
      callBack?: () => void;
    }) => {
      const {
        repoId,
        categoryId,
        title,
        description,
        contentType,
        versionNumber,
        templateId,
        order,
        imageUrl,
      } = values;
      const response = await createDocumentTemplateAction(
        repoId,
        categoryId,
        title,
        contentType,
        versionNumber,
        templateId,
        description,
        order,
        imageUrl
      );
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      const { callBack, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${categoryId || "parent"}-children`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useCreateDocumentTemplate;
