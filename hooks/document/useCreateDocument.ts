import { createDocumentAction } from "@actions/document";
import { IDocument } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createDocument"],
    mutationFn: async (values: {
      repoId: number;
      categoryId: number | undefined;
      title: string;
      description: string | undefined;
      contentType: EDocumentTypes;
      isTemplate: boolean;
      order?: number;
      imageUrl?: string;
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
      } = values;
      const response = await createDocumentAction(
        repoId,
        categoryId,
        title,
        description,
        contentType,
        isTemplate,
        order,
        imageUrl
      );
      return response?.data as IDocument;
    },
    onSuccess: (response, values) => {
      const { successCallBack, categoryId } = values;
      queryClient.invalidateQueries({
        queryKey: [`category-${categoryId || "parent"}-children`],
      });
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
