import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editorDataAtom, editorModeAtom } from "atom/editor";
import { selectedDocumentAtom } from "atom/document";
import { toast } from "react-toastify";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import { IVersion } from "@interface/version.interface";
import { repoAtom } from "@atom/repository";

interface IProps {
  children: JSX.Element;
  version: IVersion
}
const BlockDraft = ({ children, version }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  
  const createBlockHook = useCreateBlock();

  useEffect(() => {
    if (getRepo && selectedDocument && version && editorMode === "edit") {
      createBlockHook.mutate({repoId: getRepo.id,
        documentId: selectedDocument.id,
        versionId: version.id,
        handleError: () => {
          setEditorData(null);
        },});
    } else if ((!version || JSON.stringify(version) === "{}")) {
      setEditorData(null);
      toast.error("نسخه ای برای این سند پیدا نشد!");
    }
  }, []);

  return (
    <div className="version-list__container h-full w-full max-w-full relative modal-box flex flex-col cursor-default p-0">
      {children}
    </div>
  );
};

export default BlockDraft;
