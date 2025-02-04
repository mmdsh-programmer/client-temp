import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { useEffect } from "react";
import useEnableGroupHash from "@hooks/document/useEnableGroupHash";
import useRepoId from "@hooks/custom/useRepoId";

const DocumentEnableUserGroup = () => {
  const repoId = useRepoId();
  const [getDocument, setDocument] = useRecoilState(selectedDocumentAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const enableUserGroup = useEnableGroupHash();

  useEffect(() => {
    if (!repoId || !getDocument) return;
    if (getDocument?.attachmentUserGroup) return;

    enableUserGroup.mutate({
      repoId,
      documentId: getDocument.id,
      isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      callBack: (result) => {
        setDocument({
          ...getDocument,
          attachmentUserGroup: result.attachmentUserGroup,
          userGroupHash: result.userGroupHash,
        });
      },
    });
  }, [getDocument]);

  return null;
};

export default DocumentEnableUserGroup;
