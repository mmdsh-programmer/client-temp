import {
 editorDataAtom, editorModalAtom, editorModeAtom 
} from "@atom/editor";
import {
 useRecoilState, useRecoilValue, useSetRecoilState 
} from "recoil";

import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import { versionModalListAtom } from "@atom/version";

export interface IProps {
  dialogHeader?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const EditorHeader = ({
 dialogHeader, setOpen, disabled 
}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const [editorData, setEditorData] = useRecoilState(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const freeDraftHook = useFreeDraft();

  const handleClose = () => {
    setOpen?.(false);
    if (
      getRepo &&
      getSelectedDocument &&
      editorData &&
      ["edit", "temporaryPreview"].includes(editorMode)
    ) {
      freeDraftHook.mutate({
        repoId: getRepo!.id,
        documentId: getSelectedDocument.id,
        versionId: editorData.id,
        versionNumber: "",
        content: "",
        outline: "",
      });
    }
    setVersionModalList(false);
    setEditorData(null);
    setEditorModal(false);
  };

  return !disabled ? (
    <>
      <div className="block xs:hidden">
        <BackButton onClick={handleClose} />
      </div>
      <Typography className="title_t1">{dialogHeader}</Typography>
      <div className="hidden xs:block">
        <CloseButton onClose={handleClose} disabled={disabled} />
      </div>
    </>
  ) : (
    <Typography className="title_t1">{dialogHeader}</Typography>
  );
};

export default EditorHeader;
