import { useEffect } from "react";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editorVersionAtom } from "atom/editor";
import { repoAtom } from "@atom/repository";
import { versionModalListAtom } from "@atom/version";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentLastVersion = ({ document }: IProps) => {
  const repository = useRecoilValue(repoAtom);
  const setEditorVersion = useSetRecoilState(editorVersionAtom);
  const [getVersionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);

  const { data: getLastVersion, isSuccess } = useGetLastVersion(
    repository!.id,
    document!.id
  );

  useEffect(() => {
    if (!getLastVersion) {
      setVersionModalList("SHOW");
    }
    if (
      document?.contentType === EDocumentTypes.board &&
      getLastVersion &&
      getVersionModalList !== "SHOW"
    ) {
      window.open(
        `http://localhost:8080/board/${getLastVersion?.id}`,
        "_blank"
      );
    } else {
      setEditorVersion(getLastVersion || null);
    }
  });
  return null;
};

export default DocumentLastVersion;
