import { editDocumentAction } from "@actions/document";
import { categoryShow } from "@atom/category";
import { IDocument } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

const useEditDocument = (move?: boolean) => {
  const queryClient = useQueryClient();
  const getCategoryShow = useRecoilValue(categoryShow);

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
        tagIds
      );
      return response as IDocument;
    },
    onSuccess: (response, values) => {
      const { callBack, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [
          `category-${getCategoryShow?.id || "parent"}-children`,
          undefined,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `category-${categoryId || "parent"}-children`,
          undefined,
        ],
      });
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
  });
};

export default useEditDocument;
