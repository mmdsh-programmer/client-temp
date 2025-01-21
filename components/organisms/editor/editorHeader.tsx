import { editorDataAtom, editorModalAtom, editorModeAtom } from "@atom/editor";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import useGetUser from "@hooks/auth/useGetUser";

export interface IProps {
  dialogHeader?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const EditorHeader = ({ dialogHeader, setOpen, disabled }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const [editorData, setEditorData] = useRecoilState(editorDataAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const getRepoId = searchParams?.get("repoId");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const freeDraftHook = useFreeDraft();

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return getSelectedDocument!.repoId;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    return getRepo!.id;
  };

  const handleClose = () => {
    setOpen?.(false);
    if (
      repoId() &&
      getSelectedDocument &&
      editorData &&
      ["edit", "temporaryPreview"].includes(editorMode)
    ) {
      freeDraftHook.mutate({
        repoId: repoId(),
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
      <div className="hidden xs:block">
        <CloseButton onClose={handleClose} disabled={disabled} />
      </div>
    </>
  ) : (
    <Typography className="title_t1">{dialogHeader}</Typography>
  );
};

export default EditorHeader;
