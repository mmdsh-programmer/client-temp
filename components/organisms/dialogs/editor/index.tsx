import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "./blockDraftDialog";
import { EDocumentTypes } from "@interface/enums";
import EditorComponent from "@components/organisms/editor";
import EditorDialog from "@components/templates/dialog/editorDialog";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { IVersion } from "@interface/version.interface";
import PublicKeyInfo from "./publicKeyInfo";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetUser from "@hooks/auth/useGetUser";
import useGetVersion from "@hooks/version/useGetVersion";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ setOpen }: IProps) => {
  // TODO: REFACTOR NEEDED (HIGH PRIORITY)

  const repoId = useRepoId();
  const getSelectedDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const setSelectedDocument = useDocumentStore((s) => {
    return s.setSelectedDocument;
  });
  const editorMode = useEditorStore((s) => {
    return s.editorMode;
  });
  const setEditorModal = useEditorStore((s) => {
    return s.setEditorModal;
  });
  const getVersionData = useEditorStore((s) => {
    return s.editorData;
  });
  const setEditorData = useEditorStore((s) => {
    return s.setEditorData;
  });
  const versionModalList = useVersionStore((s) => {
    return s.versionModalList;
  });
  const setVersionModalList = useVersionStore((s) => {
    return s.setVersionModalList;
  });
  const getSelectedVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const setSelectedVersion = useVersionStore((s) => {
    return s.setSelectedVersion;
  });
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const decryptedContent = useEditorStore((s) => {
    return s.editorDecryptedContent;
  });
  const setDecryptedContent = useEditorStore((s) => {
    return s.setEditorDecryptedContent;
  });
  const setPublicKey = useEditorStore((s) => {
    return s.setEditorPublicKey;
  });
  const setListDrawer = useEditorStore((s) => {
    return s.setEditorListDrawer;
  });
  const getDocumentShow = useDocumentStore((s) => {
    return s.documentShow;
  });
  const setDocumentShow = useDocumentStore((s) => {
    return s.setDocumentShow;
  });
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const isEncryptedContent = useMemo(() => {
    const content = getVersionData?.content;
    if (!content) {
      return false;
    }

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
      (currentPath === "/admin/dashboard" &&
        userInfo?.repository.id !== getSelectedDocument?.repoId),
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
      const errorMessage = error?.message || lastVersionError?.message || "خطای نامشخص";
      toast.error(errorMessage);
      handleClose();
    }
  }, [error, lastVersionError]);

  useEffect(() => {
    if (getVersionData && !isEncryptedContent) {
      setShowKey(false);
    }
  }, [getVersionData, isEncryptedContent]);

  const handleDecryption = useCallback((content: string) => {
    setDecryptedContent(content);
    setShowKey(false);
  }, []);

  if (lastVersionIsSuccess && !getLastVersion) {
    toast.warn("آخرین نسخه یافت نشد.");
  }

  if (
    showKey &&
    !decryptedContent &&
    getVersionData &&
    getVersionData.content?.length &&
    isEncryptedContent
  ) {
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
          <Spinner className="h-5 w-5" color="deep-purple" />
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
