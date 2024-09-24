import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editorDataAtom, editorModalAtom, editorModeAtom } from "atom/editor";
import { selectedDocumentAtom } from "atom/document";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import useCreateBlock from "@hooks/editor/useCreateBlock";

interface IProps {
  children: JSX.Element;
}
const BlockDraft = ({ children }: IProps) => {
  const createBlockHook = useCreateBlock();
  const [editorData, setEditorData] = useRecoilState(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const editorModal = useRecoilValue(editorModalAtom);

  useEffect(() => {
    if (getRepo && selectedDocument && editorData && editorMode === "edit") {
      createBlockHook.mutate({
        repoId: getRepo.id,
        documentId: selectedDocument?.id,
        versionId: editorData.id,
        handleError: () => {
          setEditorData(null);
        },
      });
    } else if (editorModal && (!editorData || JSON.stringify(editorData) === "{}")) {
      setEditorData(null);
      toast.error("نسخه ای برای این سند پیدا نشد!");
    }
  }, [editorData?.id]);

  return (
    <div className={`version-list__container h-full w-full max-w-full relative modal-box flex flex-col cursor-default p-0`}>
      {children}
    </div>
  );
};

export default BlockDraft;
