import React, { useEffect, useRef, useState } from "react";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { repoAtom } from "@atom/repository";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { editorDataAtom, editorModeAtom } from "@atom/editor";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import { EDocumentTypes } from "@interface/enums";
import RenderIf from "@components/atoms/renderIf";
import FreeDraftDialog from "@components/templates/dialog/freeDraftDialog";

const timeout = 5 * 60; // seconds

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
}

const BlockDraftDialog = ({ editorRef }: IProps) => {
  const repository = useRecoilValue(repoAtom);
  const [selectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const [version, setVersion] = useRecoilState(selectedVersionAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);

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
    if (!freeDraftHook.isPending && version && repository && selectedDocument) {
      const value = (await editorRef.current?.getData()) as any;
      try {
        freeDraftHook.mutate({
          content:
            selectedDocument?.contentType === EDocumentTypes.classic
              ? value?.content
              : value,
          outline:
            selectedDocument?.contentType === EDocumentTypes.classic
              ? value?.outline
              : "[]",
          repoId: repository.id,
          documentId: selectedDocument.id,
          versionId: version.id,
          versionNumber: version?.versionNumber,
          callBack: () => {
            setShowFreeDraftModal(false);
            stopWorker();
            setSelectedDocument(null);
            setEditorData(null);
            setVersion(null);
          },
        });
      } catch {
        //
      }
    }
  };

  const handleBlockDraft = () => {
    if (repository && selectedDocument && version && editorMode === "edit") {
      const data = {
        repoId: repository.id,
        documentId: selectedDocument.id,
        versionId: version.id,
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
  }, [editorMode, version]);

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
        isLoading={freeDraftHook.isPending}
        onClose={handleFreeDraft}
        onResume={handleBlockDraft}
      />
    </RenderIf>
  );
};

export default BlockDraftDialog;
