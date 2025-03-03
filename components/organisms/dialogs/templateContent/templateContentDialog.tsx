import React, { useState } from "react";

import ChildrenTree from "@components/organisms/childrenTree";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { IRemoteEditorRef } from "clasor-remote-editor";
import LoadHtml from "./loadHtml";
import { documentTemplateAtom } from "@atom/document";
import { useRecoilState } from "recoil";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateContentDialog = ({ setOpen, editorRef }: IProps) => {
  // TODO CODE REVIEW REQUIRED
  
  const [loading, setLoading] = useState(false);
  const [getDocumentTemplate, setDocumentTemplate] = useRecoilState(documentTemplateAtom);

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
      disabled={!getDocumentTemplate}
    >
      <ChildrenTree move={false} enableAction={false} />
      {loading ? (
        <LoadHtml
          handleClose={handleClose}
          editorRef={editorRef}
        />
      ) : null}
    </ConfirmFullHeightDialog>
  );
};

export default TemplateContentDialog;
