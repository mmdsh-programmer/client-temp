import { editDocumentAction } from "@actions/document";
import { IDocument } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEditDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editDocument"],
    mutationFn: async (values: {
      repoId: number | undefined;
      documentId: number;
      categoryId: number | null;
      title: string;
      description: string | undefined;
      contentType: EDocumentTypes;
      order?: number | null;
      isHidden?: boolean;
      tagIds?: number[];
      callBack?: () => void;
    }) => {
      const {
        repoId,
        categoryId,
        documentId,
        contentType,
        tagIds,
        order,
        isHidden,
        description,
        title,
      } = values;
      const response = await editDocumentAction(
        repoId,
        documentId,
        categoryId,
        title,
        description,
        contentType,
        order,
        isHidden,
        tagIds
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

export default useEditDocument;
