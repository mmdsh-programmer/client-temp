import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EDocumentTypes } from "@interface/enums";
import { IActionError } from "@interface/app.interface";
import { IDocument } from "@interface/document.interface";
import { editDocumentAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

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
      isDirectAccess?: boolean;
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
        isDirectAccess
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
        isDirectAccess
      );
      handleClientSideHookError(response as IActionError);
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      const { callBack, repoId, categoryId, currentParentId, documentId } = values;
      
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "root"}-children-for-move`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${currentParentId || "root"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${categoryId || "root"}-children`],
      });
      queryClient.invalidateQueries({
        queryKey: [`document-${documentId}-info`],
      });
      queryClient.invalidateQueries({
        queryKey: [`repo-${repoId}-children-user-document`],
      });
      queryClient.invalidateQueries({
        queryKey: ["personal-documents"],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditDocument;
