import { useQuery } from "@tanstack/react-query";
import { getDocumentPublishLinkAction } from "@actions/document";

const useGetDocumentPublishLink = (
    repoId: number,
    documentId: number,
    password?: string,
    enabled?: boolean,
) => {
    return useQuery({
        queryKey: ["documentPublishLink", documentId],
        queryFn: async () => {
            const response = await getDocumentPublishLinkAction(
                repoId,
                documentId,
                password
            );

            if (response?.statusCode) {
                throw new Error(response.message || "خطا در دریافت اطلاعات لینک انتشار سند");
            }

            return response;
        },
        enabled,
    });
};

export default useGetDocumentPublishLink;