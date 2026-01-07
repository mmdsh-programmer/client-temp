"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { EDocumentTypes } from "@interface/enums";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { IVersion } from "@interface/version.interface";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "../dialogs/editor/blockDraftDialog";
import EditorComponent from "@components/organisms/editor";
import EditorHeader from "../editor/editorHeader";
import EditorFooter from "../editor/editorFooter";
import EditorFileFooter from "../editor/editorFileFooter";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import PublicKeyInfo from "../dialogs/editor/publicKeyInfo";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Error from "@components/organisms/error";
import LastVersionCreateDialog from "../dialogs/editorTab/lastVersionCreateDialog";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import useRepoId from "@hooks/custom/useRepoId";
import { useIsMutating } from "@tanstack/react-query";

const EditorTab = () => {
  const repoId = useRepoId();
  const searchParams = useSearchParams();

  const { selectedDocument: getSelectedDocument, setSelectedDocument } = useDocumentStore();
  const {
    editorMode,
    editorData: getVersionData,
    setEditorData: setVersionData,
    editorDecryptedContent: decryptedContent,
    setEditorDecryptedContent: setDecryptedContent,
    setEditorPublicKey: setPublicKey,
  } = useEditorStore();
  const {
    versionModalList,
    setVersionModalList,
    selectedVersion: getSelectedVersion,
    setSelectedVersion,
  } = useVersionStore();

  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);

  const versionId = searchParams?.get("versionId");
  const versionState = searchParams?.get("versionState");
  const sharedDocuments = searchParams?.get("sharedDocuments");
  const documentType = searchParams?.get("type");

  const revertVersion = useIsMutating({ mutationKey: ["revertVersion"] });

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

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

  const getEditorConfig = useCallback((): {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  } => {
    const editors = {
      [EDocumentTypes.classic]: process.env.NEXT_PUBLIC_CLASSIC_EDITOR as string,
      [EDocumentTypes.word]: process.env.NEXT_PUBLIC_WORD_EDITOR as string,
      [EDocumentTypes.latex]: process.env.NEXT_PUBLIC_LATEX_EDITOR as string,
      [EDocumentTypes.excel]: process.env.NEXT_PUBLIC_EXCEL_EDITOR as string,
      [EDocumentTypes.flowchart]: process.env.NEXT_PUBLIC_FLOWCHART_EDITOR as string,
    };
    const contentType = getSelectedDocument?.contentType || EDocumentTypes.classic;
    return {
      url: editors[contentType],
      ref: editorRefs[contentType],
    };
  }, [getSelectedDocument?.contentType]);

  const {
    data: getLastVersion,
    isSuccess: lastVersionIsSuccess,
    error: lastVersionError,
  } = useGetLastVersion(
    repoId!,
    getSelectedDocument!.id,
    sharedDocuments === "true",
    !getVersionData,
  );

  const vId = getSelectedVersion ? getSelectedVersion.id : versionId || getLastVersion?.id;
  const vState = getSelectedVersion
    ? getSelectedVersion.state
    : versionState || getLastVersion?.state;

  const { data, isFetching, error, isSuccess, refetch } = useGetVersion(
    repoId!,
    getSelectedDocument!.id,
    +vId!,
    vState as "draft" | "version" | "public" | undefined,
    editorMode === "preview",
    editorMode === "preview",
    sharedDocuments === "true",
    true,
  );

  const handleClose = useCallback(() => {
    setDecryptedContent(null);
    setShowKey(false);
    setPublicKey(null);
    setSelectedVersion(null);
    window.close();
  }, [setDecryptedContent, setPublicKey, setSelectedVersion]);

  const handleDecryption = useCallback(
    (content: string) => {
      setDecryptedContent(content);
      setShowKey(false);
    },
    [setDecryptedContent],
  );

  useEffect(() => {
    if (revertVersion) {
      refetch();
    }
  }, [revertVersion, refetch]);

  useEffect(() => {
    if (error || lastVersionError) {
      setSelectedDocument(null);
      setVersionModalList(false);
    } else if (!getLastVersion && isSuccess) {
      setVersionModalList(true);
    }
  }, [
    error,
    lastVersionError,
    getLastVersion,
    isSuccess,
    setSelectedDocument,
    setVersionModalList,
  ]);

  useEffect(() => {
    if (
      getSelectedDocument?.contentType === EDocumentTypes.board &&
      getLastVersion &&
      !versionModalList
    ) {
      window.open(`http://localhost:8080/board/${getLastVersion?.id}`, "_blank");
    }
  }, [getSelectedDocument?.contentType, getLastVersion, versionModalList]);

  useEffect(() => {
    if (data) {
      const nextVersion: IVersion =
        getLastVersion?.state === "version" && editorMode === "edit"
          ? { ...data, id: data?.draftId ?? data?.id, state: "draft" }
          : data;

      setVersionData(nextVersion);
      setSelectedVersion(nextVersion);
    }
  }, [data, getLastVersion, editorMode, setVersionData, setSelectedVersion]);

  useEffect(() => {
    if (getVersionData && !isEncryptedContent) {
      setShowKey(false);
    }
  }, [getVersionData, isEncryptedContent]);

  const renderContent = useCallback(() => {
    if (isFetching) {
      return (
        <div className="main flex h-full w-full items-center justify-center text-center">
          <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      );
    }

    if (isSuccess && data) {
      return (
        <BlockDraft version={data}>
          <PublicKeyInfo
            repoId={repoId!}
            publicKeyId={
              getSelectedDocument?.publicKeyId ? +getSelectedDocument.publicKeyId : undefined
            }
          >
            <>
              <BlockDraftDialog editorRef={getEditorConfig().ref} onClose={handleClose} />
              <div className="border-b-none flex items-center gap-[10px] border-normal bg-primary p-6 xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5">
                <EditorHeader dialogHeader={getSelectedDocument?.name} />
              </div>
              <EditorComponent version={data} getEditorConfig={getEditorConfig} />
              <div className="flex gap-2 border-t-[0.5px] border-t-gray-200 bg-primary p-5 xs:gap-3 xs:px-6 xs:py-4">
                {documentType === EDocumentTypes.file ? (
                  <EditorFileFooter />
                ) : (
                  <EditorFooter editorRef={getEditorConfig().ref} />
                )}
              </div>
            </>
          </PublicKeyInfo>
        </BlockDraft>
      );
    }

    return null;
  }, [
    isFetching,
    isSuccess,
    data,
    repoId,
    getSelectedDocument,
    getEditorConfig,
    handleClose,
    documentType,
  ]);

  if (error || lastVersionError) {
    const errorMessage = error?.message || lastVersionError?.message || "خطای نامشخص";
    return <Error error={{ message: errorMessage }} retry={refetch} />;
  }

  if (lastVersionIsSuccess && !getLastVersion) {
    toast.warn("آخرین نسخه یافت نشد.");
    return <LastVersionCreateDialog close={handleClose} />;
  }

  if (showKey && !decryptedContent && getVersionData && getVersionData.content?.length) {
    return (
      <EditorKey
        isPending={isFetching}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData.content}
      />
    );
  }

  if (versionModalList) {
    return <VersionDialogView />;
  }

  return <div className="h-screen flex-grow overflow-auto p-0">{renderContent()}</div>;
};

export default EditorTab;
