import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { EDocumentTypes } from "@interface/enums";
import { editorDataAtom } from "atom/editor";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import { versionModalListAtom } from "@atom/version";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

const DocumentLastVersion = () => {
  const repository = useRecoilValue(repoAtom);
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const setEditorVersion = useSetRecoilState(editorDataAtom);
  const [getVersionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);

  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    } else if (currentPath === "/admin/sharedDocuments") {
      return getSelectedDocument!.repoId;
    } else {
      return repository!.id;
    }
  };
  

  const {
    data: getLastVersion,
    error,
    isSuccess,
  } = useGetLastVersion(repoId(), getSelectedDocument!.id);

  useEffect(() => {
    if (error) {
      setSelectedDocument(null);
      setVersionModalList(false);
    }
    if (!getLastVersion && isSuccess) {
      setVersionModalList(true);
    }
    if (
      document?.contentType === EDocumentTypes.board &&
      getLastVersion &&
      !getVersionModalList
    ) {
      window.open(
        `http://localhost:8080/board/${getLastVersion?.id}`,
        "_blank"
      );
    } else {
      setEditorVersion(getLastVersion || null);
    }
  }, [getLastVersion, error]);

  return null;
};

export default DocumentLastVersion;
