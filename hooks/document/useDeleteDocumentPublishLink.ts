import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDocumentPublishLinkAction } from "@actions/document";

const useDeleteDocumentPublishLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: {
            repoId: number;
            documentId: number;
            categoryId: number;
            callBack?: () => void;
        }) => {
            const { repoId, documentId, callBack } = values;
            const response = await deleteDocumentPublishLinkAction(
                repoId,
                documentId
            );

            if (response?.statusCode) {
                throw new Error(response.message || "خطا در حذف لینک انتشار سند");
            }

            if (callBack) {
                callBack();
            }

            return response;
        },
        onSuccess: (response, values) => {
            const { categoryId } = values;
            queryClient.invalidateQueries({
                queryKey: [`category-${categoryId || "root"}-children`],
              });
            toast.success("لینک انتشار سند با موفقیت حذف شد");
        },
        onError: (error: Error) => {
            toast.error(error.message || "خطا در حذف لینک انتشار سند");
        },
    });
};

export default useDeleteDocumentPublishLink;