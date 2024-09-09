import { useEffect } from "react";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editorVersionAtom } from "atom/editor";
import { repoAtom } from "@atom/repository";
import { versionModalListAtom } from "@atom/version";
import { EDocumentTypes } from "@interface/enums";
import { selectedDocumentAtom } from "@atom/document";

const DocumentLastVersion = () => {
  const repository = useRecoilValue(repoAtom);
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const setEditorVersion = useSetRecoilState(editorVersionAtom);
  const [getVersionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);

  const { data: getLastVersion, error, isSuccess } = useGetLastVersion(
    repository!.id,
    getSelectedDocument!.id
  );

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
