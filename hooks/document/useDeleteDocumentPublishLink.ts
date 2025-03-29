import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDocumentPublishLinkAction } from "@actions/document";
import { handleClientSideHookError } from "@utils/error";
import { IActionError } from "@interface/app.interface";

const useDeleteDocumentPublishLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: {
            repoId: number;
            documentId: number;
            categoryId: number;
            callBack?: () => void;
        }) => {
            const { repoId, documentId } = values;
            const response = await deleteDocumentPublishLinkAction(
                repoId,
                documentId
            );

            handleClientSideHookError(response as IActionError);

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