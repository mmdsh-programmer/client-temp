import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorDialog from "@components/templates/dialog/editorDialog";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import useGetVersion from "@hooks/version/useGetVersion";
import {
  editorDataAtom,
  editorDecryptedContentAtom,
  editorModalAtom,
  editorModeAtom,
  editorPublicKeyAtom,
  editorVersionAtom,
} from "@atom/editor";
import Error from "@components/organisms/error";
import EditorComponent from "@components/organisms/editor";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { EDocumentTypes } from "@interface/enums";
import { versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { Spinner } from "@material-tailwind/react";
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
  const setEditorData = useSetRecoilState(editorDataAtom);
  const [version, setVersion] = useRecoilState(editorVersionAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const [showKey, setShowKey] = useState(!!getSelectedDocument?.publicKeyId);
  const [decryptedContent, setDecryptedContent] = useRecoilState(editorDecryptedContentAtom);
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);


  const classicEditorRef = useRef<IRemoteEditorRef>(null);
  const wordEditorRef = useRef<IRemoteEditorRef>(null);
  const excelEditorRef = useRef<IRemoteEditorRef>(null);
  const flowchartEditorRef = useRef<IRemoteEditorRef>(null);
  const latexEditorRef = useRef<IRemoteEditorRef>(null);

  const { data, isLoading, error, isSuccess } = useGetVersion(
    getRepo!.id,
    getSelectedDocument!.id,
    version?.id,
    version?.state, // state
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument,
    !!version
  );

  const {
    data: keyInfo,
    isLoading: isLoadingKey,
    error: keyError,
    isSuccess: isSuccessKey
  } = useGetKey(
    getRepo!.id,
    getSelectedDocument?.publicKeyId
      ? +getSelectedDocument.publicKeyId
      : undefined
  );

  useEffect(() => {
    if (data && isSuccess) {
      setEditorData(data);
      setVersion(data);
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
    setVersion(null);
    setDecryptedContent(null);
    setShowKey(false);
    setPublicKey(null);
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

  if (!!versionModalList) {
    return <VersionDialogView />;
  }

  if (showKey && !decryptedContent && version?.content) {
    return (
      <EditorKey
        isPending={isLoading || isLoadingKey}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={version?.content}
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
        <EditorComponent getEditorConfig={getEditorConfig} />
      )}
    </EditorDialog>
  );
};

export default Editor;
