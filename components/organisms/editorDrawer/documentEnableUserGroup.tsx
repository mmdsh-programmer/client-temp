import { useEffect } from "react";
import { selectedDocumentAtom } from "@atom/document";
import { useRecoilValue } from "recoil";
import useEnableGroupHash from "@hooks/document/useEnableGroupHash";
import { repoAtom } from "@atom/repository";

const DocumentEnableUserGroup = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const enableUserGroup = useEnableGroupHash();

  useEffect(() => {
    if (!getRepo || !getDocument) return;
    if (getDocument?.attachmentUserGroup) return;

    enableUserGroup.mutate({
      repoId: getRepo.id,
      documentId: getDocument.id,
    });
  }, [getDocument]);

  return null;
};

export default DocumentEnableUserGroup;
