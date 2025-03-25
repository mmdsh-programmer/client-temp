import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createDocumentPublishLinkAction } from "@actions/document";

const useCreateDocumentPublishLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: {
            repoId: number;
            categoryId: number | undefined;
            documentId: number;
            expireTime?: number;
            callBack?: () => void;
        }) => {
            const { repoId, documentId, expireTime, callBack } = values;
            const response = await createDocumentPublishLinkAction(
                repoId,
                documentId,
                expireTime,
            );

            if (response?.statusCode) {
                throw new Error(response.message || "خطا در ایجاد لینک انتشار سند");
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
            toast.success("لینک انتشار سند با موفقیت ایجاد شد");
        },
        onError: (error: Error) => {
            toast.error(error.message || "خطا در ایجاد لینک انتشار سند");
        },
    });
};

export default useCreateDocumentPublishLink;