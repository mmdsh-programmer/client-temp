import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  editorDataAtom,
  editorDecryptedContentAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "../dialogs/editor/blockDraftDialog";
import { EDocumentTypes } from "@interface/enums";
import EditorComponent from "@components/organisms/editor";
import EditorFooter from "../editor/editorFooter";
import EditorHeader from "../editor/editorHeader";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import { IRemoteEditorRef } from "clasor-remote-editor";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import useRepoId from "@hooks/custom/useRepoId";
import PublicKeyInfo from "../dialogs/editor/publicKeyInfo";

const EditorTab = () => {
  const currentPath = usePathname();

  const repoId = useRepoId();
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const [getVersionData, setVersionData] = useRecoilState(editorDataAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const [getSelectedVersion, setSelectedVersion] =
    useRecoilState(selectedVersionAtom);
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const [decryptedContent, setDecryptedContent] = useRecoilState(
    editorDecryptedContentAtom
  );
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);

  const searchParams = useSearchParams();
  const versionId = searchParams?.get("versionId");
  const versionState = searchParams?.get("versionState");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

  const { data: getLastVersion, isSuccess: lastVersionIsSuccess } =
    useGetLastVersion(
      repoId,
      getSelectedDocument!.id,
      sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      !getVersionData
    );

  const vId = getSelectedVersion
    ? getSelectedVersion.id
    : versionId || getLastVersion?.id;
  const vState = getSelectedVersion
    ? getSelectedVersion.state
    : versionState || getLastVersion?.state;

  const { data, isFetching, error, isSuccess } = useGetVersion(
    repoId,
    getSelectedDocument!.id,
    +vId!,
    vState as "draft" | "version" | "public" | undefined,
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true
  );

  const getEditorConfig = (): {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  } => {
    const editors = {
      [EDocumentTypes.classic]: process.env
        .NEXT_PUBLIC_CLASSIC_EDITOR as string,
      [EDocumentTypes.word]: process.env.NEXT_PUBLIC_WORD_EDITOR as string,
      [EDocumentTypes.latex]: process.env.NEXT_PUBLIC_LATEX_EDITOR as string,
      [EDocumentTypes.excel]: process.env.NEXT_PUBLIC_EXCEL_EDITOR as string,
      [EDocumentTypes.flowchart]: process.env
        .NEXT_PUBLIC_FLOWCHART_EDITOR as string,
    };
    const contentType =
      getSelectedDocument?.contentType || EDocumentTypes.classic;
    return {
      url: editors[contentType],
      ref: editorRefs[contentType],
    };
  };

  useEffect(() => {
    if (error) {
      setSelectedDocument(null);
      setVersionModalList(false);
    } else if (!getLastVersion && isSuccess) {
      setVersionModalList(true);
    }
    if (
      document?.contentType === EDocumentTypes.board &&
      getLastVersion &&
      !versionModalList
    ) {
      window.open(
        `http://localhost:8080/board/${getLastVersion?.id}`,
        "_blank"
      );
    }
  }, [getLastVersion]);

  useEffect(() => {
    if (data && isSuccess) {
      setVersionData(data);
    }
  }, [data]);

  const handleDecryption = useCallback((content: string) => {
    setDecryptedContent(content);
    setShowKey(false);
  }, []);

  const handleClose = () => {
    setDecryptedContent(null);
    setShowKey(false);
    setPublicKey(null);
    setSelectedVersion(null);
    window.close();
  };

  if (error) {
    toast.warn("باز کردن سند با خطا مواجه شد.");
    handleClose();
    return null;
  }

  if (lastVersionIsSuccess && !getLastVersion) {
    toast.warn("آخرین نسخه یافت نشد.");
    handleClose();
    return null;
  }

  if (
    showKey &&
    !decryptedContent &&
    getVersionData &&
    getVersionData.content?.length
  ) {
    return (
      <EditorKey
        isPending={isFetching}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData?.content}
      />
    );
  }

  if (versionModalList) {
    return <VersionDialogView />;
  }

  return data ? (
    <div className="h-screen flex-grow p-0 overflow-auto">
      <BlockDraft version={data}>
        <PublicKeyInfo
          repoId={repoId}
          publicKeyId={
            getSelectedDocument?.publicKeyId
              ? +getSelectedDocument.publicKeyId
              : undefined
          }
        >
          <>
            <BlockDraftDialog
              editorRef={getEditorConfig().ref}
              onClose={handleClose}
            />
            <div className="flex items-center xs:justify-between gap-[10px] xs:gap-0 p-6 xs:px-6 xs:py-5 border-b-none xs:border-b-[0.5px] border-normal bg-primary">
              <EditorHeader dialogHeader={getSelectedDocument?.name} />
            </div>
            <EditorComponent version={data} getEditorConfig={getEditorConfig} />
            <div className="flex p-5 xs:px-6 xs:py-4 gap-2 xs:gap-3 border-t-gray-200 border-t-[0.5px] bg-primary">
              <EditorFooter editorRef={getEditorConfig().ref} />
            </div>
          </>
        </PublicKeyInfo>
      </BlockDraft>
    </div>
  ) : null;
};

export default EditorTab;
