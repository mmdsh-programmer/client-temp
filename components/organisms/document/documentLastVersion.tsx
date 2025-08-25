import { useEffect } from "react";
import { EDocumentTypes } from "@interface/enums";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";

const DocumentLastVersion = () => {
  const repository = useRepositoryStore((state) => {
    return state.repo;
  });
  const { selectedDocument: getSelectedDocument, setSelectedDocument } = useDocumentStore();
  const setEditorVersion = useEditorStore((state) => {
    return state.setEditorData;
  });
  const { versionModalList: getVersionModalList, setVersionModalList } = useVersionStore();

  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return getSelectedDocument!.repoId;
    }
    return repository!.id;
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
    if (document?.contentType === EDocumentTypes.board && getLastVersion && !getVersionModalList) {
      window.open(`http://localhost:8080/board/${getLastVersion?.id}`, "_blank");
    } else {
      setEditorVersion(getLastVersion || null);
    }
  }, [getLastVersion, error]);

  return null;
};

export default DocumentLastVersion;
