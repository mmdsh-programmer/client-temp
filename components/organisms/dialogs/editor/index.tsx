import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { EDocumentTypes } from "@interface/enums";
import { IRemoteEditorRef } from "clasor-remote-editor";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "./blockDraftDialog";
import EditorComponent from "@components/organisms/editor";
import EditorDialog from "@components/templates/dialog/editorDialog";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import PublicKeyInfo from "./publicKeyInfo";
import { useEditorVersion } from "./useEditorVersion";
import { Spinner } from "@components/atoms/spinner";
import { IVersion } from "@interface/version.interface";
import { useIsMutating } from "@tanstack/react-query";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ setOpen }: IProps) => {
  const repoId = useRepoId();

  const {
    selectedDocument: getSelectedDocument,
    setSelectedDocument,
    documentShow: getDocumentShow,
    setDocumentShow,
  } = useDocumentStore();

  const {
    editorMode,
    setEditorModal,
    editorData: getVersionData,
    setEditorData,
    setEditorDecryptedContent: setDecryptedContent,
    editorDecryptedContent: decryptedContent,
    setEditorPublicKey: setPublicKey,
    setEditorListDrawer: setListDrawer,
  } = useEditorStore();

  const {
    selectedVersion: getSelectedVersion,
    setSelectedVersion,
    versionModalList,
    setVersionModalList,
  } = useVersionStore();

  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);

  const revertVersion = useIsMutating({ mutationKey: ["revertVersion"] });

  const isEncryptedContent = useMemo(() => {
    const content = getVersionData?.content;
    if (!content) return false;

    try {
      const parsed = JSON.parse(content);
      return (
        parsed &&
        typeof parsed === "object" &&
        "key" in (parsed as Record<string, unknown>) &&
        "iv" in (parsed as Record<string, unknown>) &&
        "content" in (parsed as Record<string, unknown>)
      );
    } catch {
      return false;
    }
  }, [getVersionData?.content]);

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

  const getEditorConfig = useCallback(() => {
    const editors = {
      [EDocumentTypes.classic]: process.env.NEXT_PUBLIC_CLASSIC_EDITOR!,
      [EDocumentTypes.word]: process.env.NEXT_PUBLIC_WORD_EDITOR!,
      [EDocumentTypes.latex]: process.env.NEXT_PUBLIC_LATEX_EDITOR!,
      [EDocumentTypes.excel]: process.env.NEXT_PUBLIC_EXCEL_EDITOR!,
      [EDocumentTypes.flowchart]: process.env.NEXT_PUBLIC_FLOWCHART_EDITOR!,
    };

    const contentType = getSelectedDocument?.contentType || EDocumentTypes.classic;

    return { url: editors[contentType], ref: editorRefs[contentType] };
  }, [getSelectedDocument?.contentType]);

  const { version, lastVersion, isLoading, isSuccess, refetch, error } = useEditorVersion({
    repoId,
    document: getSelectedDocument,
    selectedVersion: getSelectedVersion,
    editorMode,
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    setDecryptedContent(null);
    setShowKey(false);
    setPublicKey(null);
    setSelectedVersion(null);
    setEditorModal(false);
    setListDrawer(false);

    if (!getDocumentShow) {
      setVersionModalList(false);
      setDocumentShow(null);
      setSelectedDocument(null);
    } else if (!repoId) {
      setVersionModalList(false);
    } else {
      setVersionModalList(true);
    }
  }, [
    getDocumentShow,
    repoId,
    setDecryptedContent,
    setDocumentShow,
    setEditorModal,
    setListDrawer,
    setOpen,
    setPublicKey,
    setSelectedDocument,
    setSelectedVersion,
    setVersionModalList,
  ]);

  
  useEffect(() => {
    if (revertVersion) {
      refetch();
    }
  }, [revertVersion]);
    
  useEffect(() => {
    if (!version) return;

    const nextVersion: IVersion =
      lastVersion?.state === "version" && editorMode === "edit"
        ? { ...version, id: version.draftId ?? version.id, state: "draft" }
        : version;

    setEditorData(nextVersion);
    setSelectedVersion(nextVersion);
  }, [version, lastVersion, editorMode, setEditorData, setSelectedVersion]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "خطای نامشخص";
      toast.error(errorMessage);
      handleClose();
    }
  }, [error, handleClose]);

  useEffect(() => {
    if (getVersionData && !isEncryptedContent) setShowKey(false);
  }, [getVersionData, isEncryptedContent]);

  const handleDecryption = useCallback(
    (content: string) => {
      setDecryptedContent(content);
      setShowKey(false);
    },
    [setDecryptedContent],
  );

  if (showKey && !decryptedContent && getVersionData?.content && isEncryptedContent) {
    return (
      <EditorKey
        isPending={isLoading}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData.content}
      />
    );
  }

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="main flex h-full w-full items-center justify-center text-center">
          <Spinner className="h-5 w-5" />
        </div>
      );

    if (isSuccess && version)
      return (
        <BlockDraft version={version}>
          <PublicKeyInfo
            repoId={repoId!}
            publicKeyId={
              getSelectedDocument?.publicKeyId ? +getSelectedDocument.publicKeyId : undefined
            }
          >
            <>
              <BlockDraftDialog editorRef={getEditorConfig().ref} onClose={handleClose} />
              <EditorComponent version={version} getEditorConfig={getEditorConfig} />
            </>
          </PublicKeyInfo>
        </BlockDraft>
      );

    return null;
  };

  return (
    <EditorDialog
      dialogHeader={getSelectedDocument?.name}
      setOpen={handleClose}
      editorRef={getEditorConfig().ref}
      isEditorReady={!!getVersionData}
    >
      {renderContent()}
    </EditorDialog>
  );
};

export default Editor;
