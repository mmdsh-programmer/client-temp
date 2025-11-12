import { removeDocumentPasswordCookiesAction } from "@actions/cookies";
import { useMutation } from "@tanstack/react-query";

const useRemoveDocumentPasswordCookies = (documentId: number) => {
  return useMutation({
    mutationKey: [`remove-document-${documentId}-password`],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (values: { callBack?: () => void }) => {
      await removeDocumentPasswordCookiesAction(documentId);
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
  });
};

export default useRemoveDocumentPasswordCookies;
