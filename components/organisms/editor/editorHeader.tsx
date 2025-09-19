import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import { Typography } from "@material-tailwind/react";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

export interface IProps {
  dialogHeader?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const EditorHeader = ({ dialogHeader, setOpen, disabled }: IProps) => {
  const repoId = useRepoId();
  const { selectedDocument: getSelectedDocument } = useDocumentStore();
  const { editorData, setEditorData, editorMode, setEditorModal } = useEditorStore();
  const { setSelectedVersion: setVersion } = useVersionStore();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
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
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" &&
            userInfo?.repository.id !== getSelectedDocument?.repoId),
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
      <Typography {...({} as React.ComponentProps<typeof Typography>)} className="editor-header__title title_t1">{dialogHeader}</Typography>
      <div className="hidden items-center gap-2 xs:flex">
        <CloseButton onClose={handleClose} disabled={disabled} />
      </div>
    </>
  ) : (
    <Typography {...({} as React.ComponentProps<typeof Typography>)} className="editor-header__title title_t1">{dialogHeader}</Typography>
  );
};

export default EditorHeader;
