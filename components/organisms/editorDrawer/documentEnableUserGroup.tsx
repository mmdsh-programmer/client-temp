import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useEnableGroupHash from "@hooks/document/useEnableGroupHash";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import { EDocumentTypes } from "@interface/enums";
import { useDocumentStore } from "@store/document";

const DocumentEnableUserGroup = () => {
  const repoId = useRepoId();
  const { selectedDocument: getDocument, setSelectedDocument: setDocument } = useDocumentStore();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const enableUserGroup = useEnableGroupHash();

  useEffect(() => {
    if (!repoId || !getDocument) return;
    if (getDocument?.attachmentUserGroup) return;
    if (getDocument.contentType !== EDocumentTypes.classic) return;

    enableUserGroup.mutate({
      repoId,
      documentId: getDocument.id,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
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
