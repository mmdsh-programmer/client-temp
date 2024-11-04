import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EDocumentTypes } from "@interface/enums";
import { IDocument } from "@interface/document.interface";
import { editDocumentAction } from "@actions/document";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useEditDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editDocument"],
    mutationFn: async (values: {
      repoId: number;
      documentId: number;
      categoryId: number | null;
      title: string;
      contentType: EDocumentTypes;
      description?: string;
      order?: number | null;
      isHidden?: boolean;
      tagIds?: number[];
      currentParentId?: number | null;
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
        contentType,
        description,
        order,
        isHidden,
        tagIds,
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      const { callBack, categoryId, currentParentId, documentId } = values;
      
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "parent"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "parent"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${categoryId || "parent"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`document-${documentId}-info`],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditDocument;
