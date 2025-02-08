import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  editorDataAtom,
  editorDecryptedContentAtom,
  editorListDrawerAtom,
  editorModalAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "./blockDraftDialog";
import { EDocumentTypes } from "@interface/enums";
import EditorComponent from "@components/organisms/editor";
import EditorDialog from "@components/templates/dialog/editorDialog";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import { Spinner } from "@material-tailwind/react";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import useGetKey from "@hooks/repository/useGetKey";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import { toast } from "react-toastify";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const [getVersionData, setEditorData] = useRecoilState(editorDataAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const [getSelectedVersion, setSelectedVersion] =
    useRecoilState(selectedVersionAtom);
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const [decryptedContent, setDecryptedContent] = useRecoilState(
    editorDecryptedContentAtom
  );
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);
  const setListDrawer = useSetRecoilState(editorListDrawerAtom);
  const [getDocumentShow, setDocumentShow] = useRecoilState(documentShowAtom);
  const currentPath = usePathname();

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

  const { data: getLastVersion, error: lastVersionError } = useGetLastVersion(
    repoId,
    getSelectedDocument!.id,
    !getSelectedVersion && repoId !== 0,
    true
  );

  const { data, isLoading, error, isSuccess } = useGetVersion(
    repoId,
    getSelectedDocument!.id,
    getSelectedVersion ? getSelectedVersion.id : getLastVersion?.id,
    getSelectedVersion ? getSelectedVersion.state : getLastVersion?.state, // state
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument,
    currentPath === "/admin/sharedDocuments",
    true
  );

  const {
    data: keyInfo,
    isLoading: isLoadingKey,
    error: keyError,
    isSuccess: isSuccessKey,
  } = useGetKey(
    repoId,
    getSelectedDocument?.publicKeyId
      ? +getSelectedDocument.publicKeyId
      : undefined
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
    return { url: editors[contentType], ref: editorRefs[contentType] };
  };

  useEffect(() => {
    if (lastVersionError) {
      setSelectedDocument(null);
      setVersionModalList(false);
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
      setEditorData(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (keyInfo && isSuccessKey) {
      setPublicKey(keyInfo.key);
    }
  }, [keyInfo]);

  const handleDecryption = useCallback((content: string) => {
    setDecryptedContent(content);
    setShowKey(false);
  }, []);

  const handleClose = () => {
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
  };

  if (error || keyError || lastVersionError) {
    toast.warn("باز کردن سند با خطا مواجه شد.");
    handleClose();
    return null;
  }

  if (showKey && !decryptedContent && getVersionData) {
    return (
      <EditorKey
        isPending={isLoading || isLoadingKey}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData?.content}
      />
    );
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="main w-full h-full text-center flex items-center justify-center">
          <Spinner className="h-5 w-5 " color="deep-purple" />
        </div>
      );
    }
    if (data && isSuccess) {
      return (
        <BlockDraft version={data}>
          <>
            <BlockDraftDialog
              editorRef={getEditorConfig().ref}
              onClose={handleClose}
            />
            <EditorComponent version={data} getEditorConfig={getEditorConfig} />
          </>
        </BlockDraft>
      );
    }
    return null;
  };

  return (
    <EditorDialog
      dialogHeader={getSelectedDocument?.name}
      setOpen={handleClose}
      editorRef={getEditorConfig().ref}
    >
      {renderContent()}
    </EditorDialog>
  );
};

export default Editor;
