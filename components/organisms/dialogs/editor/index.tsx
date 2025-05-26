import React, { useCallback, useEffect, useRef, useState } from "react";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
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
import { IRemoteEditorRef } from "clasor-remote-editor";
import PublicKeyInfo from "./publicKeyInfo";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import { IVersion } from "@interface/version.interface";
import useGetUser from "@hooks/auth/useGetUser";
import { clearConfig } from "dompurify";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ setOpen }: IProps) => {
  // TODO: REFACTOR NEEDED (HIGH PRIORITY)

  const repoId = useRepoId();
  const [getSelectedDocument, setSelectedDocument] = useRecoilState(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const [getVersionData, setEditorData] = useRecoilState(editorDataAtom);
  const [versionModalList, setVersionModalList] = useRecoilState(versionModalListAtom);
  const [getSelectedVersion, setSelectedVersion] = useRecoilState(selectedVersionAtom);
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const [decryptedContent, setDecryptedContent] = useRecoilState(editorDecryptedContentAtom);
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);
  const setListDrawer = useSetRecoilState(editorListDrawerAtom);
  const [getDocumentShow, setDocumentShow] = useRecoilState(documentShowAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

  const {
    data: getLastVersion,
    error: lastVersionError,
    isSuccess: lastVersionIsSuccess,
  } = useGetLastVersion(
    repoId!,
    getSelectedDocument!.id,
    currentPath === "/admin/sharedDocuments" ||
    (currentPath === "/admin/dashboard" &&
      userInfo?.repository.id !== getSelectedDocument?.repoId),
    !getSelectedVersion,
  );

  const { data, isLoading, error, isSuccess, refetch } = useGetVersion(
    repoId!,
    getSelectedDocument!.id,
    getSelectedVersion ? getSelectedVersion.id : getLastVersion?.id,
    getSelectedVersion ? getSelectedVersion.state : getLastVersion?.state, // state
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument,
    currentPath === "/admin/sharedDocuments" ||
    (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getSelectedDocument?.repoId),
    true,
  );

  const getEditorConfig = (): {
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
    return { url: editors[contentType], ref: editorRefs[contentType] };
  };

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

  useEffect(() => {
    if (data) {
      if (getLastVersion?.state === "version" && editorMode === "edit") {
        const item = {
          ...data,
          id: data?.draftId ?? data?.id,
          state: "draft",
        } as IVersion;
        setEditorData(item);
        setSelectedVersion(item);
        refetch();
      } else {
        setEditorData(data);
        setSelectedVersion(data);
        refetch();
      }
    }
  }, [data]);

  useEffect(() => {
    if (lastVersionError) {
      setSelectedDocument(null);
      setVersionModalList(false);
    }
    if (document?.contentType === EDocumentTypes.board && getLastVersion && !versionModalList) {
      window.open(`http://localhost:8080/board/${getLastVersion?.id}`, "_blank");
    }
  }, [getLastVersion]);

  useEffect(() => {
    if (data && isSuccess) {
      setEditorData(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error || lastVersionError) {
      toast.error("باز کردن سند با خطا مواجه شد.");
      handleClose();
    }
  }, [error, lastVersionError]);

  const handleDecryption = useCallback((content: string) => {
    setDecryptedContent(content);
    setShowKey(false);
  }, []);

  if (error || lastVersionError) {
    return null;
  }

  if (lastVersionIsSuccess && !getLastVersion) {
    toast.warn("آخرین نسخه یافت نشد.");
  }

  if (showKey && !decryptedContent && getVersionData && getVersionData.content?.length) {
    return (
      <EditorKey
        isPending={isLoading}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData?.content}
      />
    );
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="main flex h-full w-full items-center justify-center text-center">
          <Spinner className="h-5 w-5 " color="deep-purple" />
        </div>
      );
    }
    if (data && isSuccess) {
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
              <EditorComponent version={data} getEditorConfig={getEditorConfig} />
            </>
          </PublicKeyInfo>
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
      isEditorReady={!!getVersionData}
    >
      {renderContent()}
    </EditorDialog>
  );
};

export default Editor;
