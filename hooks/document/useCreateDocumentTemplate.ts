import {
  createDocumentAction,
  createDocumentTemplateAction,
} from "@actions/document";
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
      categoryId: number | undefined;
      title: string;
      description: string | undefined;
      contentType: EDocumentTypes;
      versionNumber: string;
      templateId: number;
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
        description,
        contentType,
        versionNumber,
        templateId,
        order,
        imageUrl
      );
      return response?.data as IDocument;
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
