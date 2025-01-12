import { useEffect } from "react";
import { selectedDocumentAtom } from "@atom/document";
import { useRecoilState, useRecoilValue } from "recoil";
import useEnableGroupHash from "@hooks/document/useEnableGroupHash";
import { repoAtom } from "@atom/repository";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

const DocumentEnableUserGroup = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [getDocument, setDocument] = useRecoilState(selectedDocumentAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const enableUserGroup = useEnableGroupHash();

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return getDocument!.repoId;
    }
    return getRepo!.id;
  };

  useEffect(() => {
    if (!repoId() || !getDocument) return;
    if (getDocument?.attachmentUserGroup) return;

    enableUserGroup.mutate({
      repoId: repoId(),
      documentId: getDocument.id,
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
