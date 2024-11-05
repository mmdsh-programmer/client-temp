import { useMutation } from "@tanstack/react-query";
import { saveDocumentPasswordInCookieAction } from "@actions/cookies";

const useSetPublishDocumentPassword = () => {
  return useMutation({
    mutationKey: ["set-publish-document-password"],
    mutationFn: async (values: {
      documentId: number;
      password: string;
      callBack?: () => void;
    }) => {
      const { documentId, password } = values;
      await saveDocumentPasswordInCookieAction(documentId, password);
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
  });
};

export default useSetPublishDocumentPassword;
