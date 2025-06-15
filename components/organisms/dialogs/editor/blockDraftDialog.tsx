import React, { useEffect, useRef, useState } from "react";
import { editorDataAtom, editorModeAtom } from "@atom/editor";
import { usePathname, useSearchParams } from "next/navigation";

import FreeDraftDialog from "@components/templates/dialog/freeDraftDialog";
import { IRemoteEditorRef } from "clasor-remote-editor";
import RenderIf from "@components/atoms/renderIf";
import { selectedDocumentAtom } from "@atom/document";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import useFreeDraft from "@hooks/editor/useFreeDraft";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";

const timeout = 5 * 60; // seconds

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  onClose: () => void;
}

const BlockDraftDialog = ({ editorRef, onClose }: IProps) => {
  const repoId = useRepoId();
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const editorContent = useRef<unknown>(null);

  const [showFreeDraftModal, setShowFreeDraftModal] = useState(false);
  const workerRef = useRef<Worker>();

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createBlockHook = useCreateBlock();
  const freeDraftHook = useFreeDraft();

  const stopWorker = () => {
    workerRef.current?.terminate();
  };

  const startWorker = (message?: number) => {
    workerRef.current = new Worker(
      new URL("../../../../hooks/worker/autoDraft.worker.ts", import.meta.url),
    );

    if (message) {
      workerRef.current.postMessage(message);
    }
  };

  const handleFreeDraft = () => {
    if (editorData && repoId && selectedDocument) {
      editorRef.current?.on("getData", (value) => {
        editorContent.current = value;
      });

      const value = editorContent.current as unknown as {
        content: string;
        outline: string;
      };

      editorRef.current?.getData();

      const content = typeof value === "string" ? value : value.content;
      const outline = typeof value === "string" ? "[]" : value.outline;

      freeDraftHook.mutate({
        content,
        outline,
        repoId,
        documentId: selectedDocument.id,
        versionId: editorData.id,
        versionNumber: editorData?.versionNumber,
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" &&
            userInfo?.repository.id !== selectedDocument?.repoId),

        callBack: () => {
          setShowFreeDraftModal(false);
          stopWorker();
          onClose();
        },
      });
    }
  };

  const handleBlockDraft = () => {
    if (repoId && selectedDocument && editorData && editorMode === "edit") {
      const data = {
        repoId,
        documentId: selectedDocument.id,
        versionId: editorData.id,
      };
      stopWorker();
      setShowFreeDraftModal(false);
      createBlockHook.mutate({
        ...data,
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" &&
            userInfo?.repository.id !== selectedDocument?.repoId),
        callBack: () => {
          startWorker(timeout);
        },
      });
    }
  };

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
    return () => {
      stopWorker();
    };
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
