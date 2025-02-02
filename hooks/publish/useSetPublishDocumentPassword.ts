import { saveDocumentPasswordInCookieAction } from "@actions/cookies";
import { useMutation } from "@tanstack/react-query";

const useSetPublishDocumentPassword = () => {
  return useMutation({
    mutationKey: ["set-publish-document-password"],
    mutationFn: async (values: {
      documentId: number;
      password: string;
      handleSuccess?: () => void;
      handleError?: () => void;
    }) => {
      const { documentId, password } = values;
      await saveDocumentPasswordInCookieAction(documentId, password);
    },
    onSuccess: (response, values) => {
      const { handleSuccess } = values;
      handleSuccess?.();
    },
    onError: (error, values) => {
      const { handleError } = values;
      handleError?.();
    },
  });
};

export default useSetPublishDocumentPassword;
