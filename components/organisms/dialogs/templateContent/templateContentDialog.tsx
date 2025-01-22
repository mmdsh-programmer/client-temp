import React, { useState } from "react";
import ChildrenTree from "@components/organisms/childrenTree";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { documentTemplateAtom } from "@atom/document";
import { useSetRecoilState } from "recoil";
import { IRemoteEditorRef } from "clasor-remote-editor";
import LoadHtml from "./loadHtml";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateContentDialog = ({ setOpen, editorRef }: IProps) => {
  const [loading, setLoading] = useState(false);

  const setDocumentTemplate =
    useSetRecoilState(documentTemplateAtom);

  const handleClose = () => {
    setOpen(false);
    setDocumentTemplate(null);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
  };

  return (
    <ConfirmFullHeightDialog
      dialogHeader="انتخاب نمونه سند"
      isPending={loading}
      setOpen={handleClose}
      onSubmit={handleSubmit}
    >
      <ChildrenTree move={false} enableAction={false} />
      {loading ? (
        <LoadHtml handleClose={handleClose} editorRef={editorRef} />
      ) : null}
    </ConfirmFullHeightDialog>
  );
};

export default TemplateContentDialog;
