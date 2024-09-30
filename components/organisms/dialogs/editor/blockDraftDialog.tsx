import React, {
 useEffect,
 useRef,
 useState
} from "react";
import {
 editorDataAtom,
 editorModeAtom
} from "@atom/editor";

import FreeDraftDialog from "@components/templates/dialog/freeDraftDialog";
import { IRemoteEditorRef } from "clasor-remote-editor";
import RenderIf from "@components/atoms/renderIf";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import { useRecoilValue } from "recoil";

const timeout = 5 * 60; // seconds

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  onClose: () => void;
}

const BlockDraftDialog = ({
 editorRef, onClose 
}: IProps) => {
  const repository = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);

  const [showFreeDraftModal, setShowFreeDraftModal] = useState(false);

  const createBlockHook = useCreateBlock();

  const freeDraftHook = useFreeDraft();
  const workerRef = useRef<Worker>();

  const stopWorker = () => {
    workerRef.current?.terminate();
  };

  const startWorker = (message?: number) => {
    workerRef.current = new Worker(
      new URL("../../../../hooks/worker/autoDraft.worker.ts", import.meta.url)
    );

    if (message) {
      workerRef.current.postMessage(message);
    }
  };

  const handleFreeDraft = async () => {
    if (editorData && repository && selectedDocument) {
      const value = (await editorRef.current?.getData()) as unknown as  ({ content: string; outline: string } | string);

      const content = typeof value === "string" ? value : value.content;
      const outline = typeof value === "string" ? "[]" : value.outline;

      freeDraftHook.mutate({
        content,
        outline,
        repoId: repository.id,
        documentId: selectedDocument.id,
        versionId: editorData.id,
        versionNumber: editorData?.versionNumber,
        callBack: () => {
          setShowFreeDraftModal(false);
          stopWorker();
          onClose();
        },
      });
    }
  };

  const handleBlockDraft = () => {
    if (repository && selectedDocument && editorData && editorMode === "edit") {
      const data = {
        repoId: repository.id,
        documentId: selectedDocument.id,
        versionId: editorData.id,
      };
      stopWorker();
      setShowFreeDraftModal(false);
      createBlockHook.mutate({
        ...data,
        callBack: () => {
          startWorker(timeout);
        },
      });
    }
  };

  useEffect(() => {
    handleBlockDraft();
    return () => {
      stopWorker();
    };
  }, [editorMode, editorData]);

  useEffect(() => {
    if (editorMode === "edit") {
      workerRef.current?.addEventListener("message", ({ data: workerData }) => {
        if (workerData < timeout) {
          setShowFreeDraftModal(true);
        } else if (workerData === timeout) {
          handleFreeDraft();
        }
      });
    }
  }, [workerRef.current, editorMode]);

  return (
    <RenderIf isTrue={showFreeDraftModal}>
      <FreeDraftDialog
        onCloseLoading={freeDraftHook.isPending}
        onResumeLoading={createBlockHook.isPending}
        onClose={handleFreeDraft}
        onResume={handleBlockDraft}
      />
    </RenderIf>
  );
};

export default BlockDraftDialog;
