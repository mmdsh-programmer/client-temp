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
    <>
      {!!versionModalList ? (
        <VersionDialogView />
      ) : (
        <BlockDraft>
          <>
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
                <>
                  <BlockDraftDialog editorRef={getEditorConfig().ref} onClose={handleClose}/>
                  <EditorComponent
                    version={data}
                    getEditorConfig={getEditorConfig}
                  />
                </>
              )}
            </EditorDialog>
          </>
        </BlockDraft>
      )}
    </>
  );
};

export default Editor;
