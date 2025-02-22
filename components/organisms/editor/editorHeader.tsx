import React from "react";
import { editorDataAtom, editorModalAtom, editorModeAtom } from "@atom/editor";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import { Typography } from "@material-tailwind/react";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import useRepoId from "@hooks/custom/useRepoId";
import DownloadPDF from "@components/molecules/downloadPDF";

export interface IProps {
  dialogHeader?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const EditorHeader = ({ dialogHeader, setOpen, disabled }: IProps) => {
  const repoId = useRepoId();
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const [editorData, setEditorData] = useRecoilState(editorDataAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const freeDraftHook = useFreeDraft();

  const handleClose = () => {
    if (currentPath === "/admin/edit") {
      window.close();
    }
    setOpen?.(false);
    if (
      repoId &&
      getSelectedDocument &&
      editorData &&
      ["edit", "temporaryPreview"].includes(editorMode)
    ) {
      freeDraftHook.mutate({
        repoId,
        documentId: getSelectedDocument.id,
        versionId: editorData.id,
        versionNumber: "",
        content: "",
        outline: "",
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments",
      });
    }
    setVersion(null);
    setEditorData(null);
    setEditorModal(false);
  };

  return !disabled ? (
    <>
      <div className="block xs:hidden">
        <BackButton onClick={handleClose} />
      </div>
      <Typography className="title_t1">{dialogHeader}</Typography>
      <div className="hidden xs:flex items-center gap-2">
        {editorMode === "preview" || editorMode === "temporaryPreview" ? (
          <DownloadPDF />
        ) : null}
        <CloseButton onClose={handleClose} disabled={disabled} />
      </div>
    </>
  ) : (
    <Typography className="title_t1">{dialogHeader}</Typography>
  );
};

export default EditorHeader;
