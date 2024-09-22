import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorDialog from "@components/templates/dialog/editorDialog";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import useGetVersion from "@hooks/version/useGetVersion";
import {
  editorChatDrawerAtom,
  editorDataAtom,
  editorDecryptedContentAtom,
  editorModalAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import Error from "@components/organisms/error";
import EditorComponent from "@components/organisms/editor";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { EDocumentTypes } from "@interface/enums";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { Spinner } from "@material-tailwind/react";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "./blockDraftDialog";
import useGetKey from "@hooks/repository/useGetKey";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const [getVersionData, setVersionData] = useRecoilState(editorDataAtom);
  const setChatDrawer = useSetRecoilState(editorChatDrawerAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const setSelectedVersion = useSetRecoilState(selectedVersionAtom);
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const [decryptedContent, setDecryptedContent] = useRecoilState(
    editorDecryptedContentAtom
  );
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);

  const classicEditorRef = useRef<IRemoteEditorRef>(null);
  const wordEditorRef = useRef<IRemoteEditorRef>(null);
  const excelEditorRef = useRef<IRemoteEditorRef>(null);
  const flowchartEditorRef = useRef<IRemoteEditorRef>(null);
  const latexEditorRef = useRef<IRemoteEditorRef>(null);

  const {
    data: getLastVersion,
    error: lastVersionError,
    isSuccess: lastVersionIsSuccess,
  } = useGetLastVersion(getRepo!.id, getSelectedDocument!.id, !getVersionData);

  const { data, isLoading, error, isSuccess } = useGetVersion(
    getRepo!.id,
    getSelectedDocument!.id,
    getVersionData ? getVersionData.id : getLastVersion?.id,
    getVersionData ? getVersionData.state : getLastVersion?.state, // state
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument,
    true
  );

  const {
    data: keyInfo,
    isLoading: isLoadingKey,
    error: keyError,
    isSuccess: isSuccessKey,
  } = useGetKey(
    getRepo!.id,
    getSelectedDocument?.publicKeyId
      ? +getSelectedDocument.publicKeyId
      : undefined
  );

  useEffect(() => {
    if (error) {
      setSelectedDocument(null);
      setVersionModalList(false);
    }
    if (!getLastVersion && isSuccess) {
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

  useEffect(() => {
    if (keyInfo && isSuccessKey) {
      setPublicKey(keyInfo.key);
    }
  }, [keyInfo]);

  useEffect(() => {
    setVersionModalList(false);
  }, []);

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
    setChatDrawer(false);
  };

  if (error || keyError) {
    return (
      <div className="main w-full h-full text-center flex items-center justify-center">
        <Error
          retry={() => {
            return setEditorModal(false);
          }}
          error="باز کردن سند با خطا مواجه شد."
        />
      </div>
    );
  }

  const getEditorConfig = (): {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  } => {
    switch (getSelectedDocument?.contentType) {
      case EDocumentTypes.classic:
        return {
          url: process.env.NEXT_PUBLIC_CLASSIC_EDITOR as string,
          ref: classicEditorRef,
        };
      case EDocumentTypes.word:
        return {
          url: process.env.NEXT_PUBLIC_WORD_EDITOR as string,
          ref: wordEditorRef,
        };
      case EDocumentTypes.latex:
        return {
          url: process.env.NEXT_PUBLIC_LATEX_EDITOR as string,
          ref: latexEditorRef,
        };
      case EDocumentTypes.excel:
        return {
          url: process.env.NEXT_PUBLIC_EXCEL_EDITOR as string,
          ref: excelEditorRef,
        };
      case EDocumentTypes.flowchart:
        return {
          url: process.env.NEXT_PUBLIC_FLOWCHART_EDITOR as string,
          ref: flowchartEditorRef,
        };
      default:
        return {
          url: process.env.NEXT_PUBLIC_CLASSIC_EDITOR as string,
          ref: classicEditorRef,
        };
    }
  };

  if (error) {
    return (
      <div className="main w-full h-full text-center flex items-center justify-center">
        <Error
          retry={() => {
            return setEditorModal(false);
          }}
          error="باز کردن سند با خطا مواجه شد."
        />
      </div>
    );
  }
  if (!!versionModalList) {
    return <VersionDialogView />;
  }

  if (showKey && !decryptedContent && getVersionData?.content) {
    return (
      <EditorKey
        isPending={isLoading || isLoadingKey}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData?.content}
      />
    );
  }

  return (
    <EditorDialog
      dialogHeader={getSelectedDocument?.name}
      isPending={isLoading || isLoadingKey}
      setOpen={handleClose}
      editorRef={getEditorConfig().ref}
    >
      {isLoading ? (
        <div className="main w-full h-full text-center flex items-center justify-center">
          <Spinner className="h-5 w-5 " color="deep-purple" />
        </div>
      ) : (
        <BlockDraft>
          <>
            <BlockDraftDialog editorRef={getEditorConfig().ref} />
            <EditorDialog
              dialogHeader={getSelectedDocument?.name}
              isPending={isLoading}
              setOpen={handleClose}
              editorRef={getEditorConfig().ref}
            >
              {isLoading ? (
                <div className="main w-full h-full text-center flex items-center justify-center">
                  <Spinner className="h-5 w-5 " color="deep-purple" />
                </div>
              ) : (
                <EditorComponent
                  version={data}
                  getEditorConfig={getEditorConfig}
                />
              )}
            </EditorDialog>
          </>
        </BlockDraft>
      )}
    </EditorDialog>
  );
};

export default Editor;
