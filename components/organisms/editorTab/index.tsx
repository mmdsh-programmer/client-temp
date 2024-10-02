import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  editorChatDrawerAtom,
  editorDataAtom,
  editorDecryptedContentAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import BlockDraft from "@components/organisms/editor/blockDraft";
import BlockDraftDialog from "../dialogs/editor/blockDraftDialog";
import { EDocumentTypes } from "@interface/enums";
import EditorComponent from "@components/organisms/editor";
import EditorFooter from "../editor/editorFooter";
import EditorHeader from "../editor/editorHeader";
import EditorKey from "@components/organisms/dialogs/editor/editorKey";
import FloatingButtons from "../editor/floatingButtons";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { Spinner } from "@material-tailwind/react";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetKey from "@hooks/repository/useGetKey";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const EditorTab = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
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

  const searchParams = useSearchParams();
  const versionId = searchParams.get("versionId");
  const versionState = searchParams.get("versionState");

  const editorRefs = {
    clasor: useRef<IRemoteEditorRef>(null),
    word: useRef<IRemoteEditorRef>(null),
    excel: useRef<IRemoteEditorRef>(null),
    flowchart: useRef<IRemoteEditorRef>(null),
    latex: useRef<IRemoteEditorRef>(null),
  };

  const { data: getLastVersion } = useGetLastVersion(
    getRepo!.id,
    getSelectedDocument!.id,
    !getVersionData
  );

  const vId = versionId || getVersionData?.id || getLastVersion?.id;
  const vState =
    versionState ||
    (getVersionData ? getVersionData.state : getLastVersion?.state);

  const { data, isFetching, error, isSuccess } = useGetVersion(
    getRepo!.id,
    getSelectedDocument!.id,
    +vId!,
    vState as "draft" | "version" | "public" | undefined,
    editorMode === "preview", // innerDocument
    editorMode === "preview", // innerDocument
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
    setDecryptedContent(null);
    setShowKey(false);
    setPublicKey(null);
    setSelectedVersion(null);
    setChatDrawer(false);
    window.close();
  };

  if (error || keyError) {
    toast.warn("باز کردن سند با خطا مواجه شد.");
    handleClose();
    return null;
  }

  if (showKey && !decryptedContent && getVersionData?.content) {
    return (
      <EditorKey
        isPending={isFetching || isLoadingKey}
        onDecryption={handleDecryption}
        setOpen={handleClose}
        encryptedContent={getVersionData?.content}
      />
    );
  }

  if (versionModalList) {
    return <VersionDialogView />;
  }

  // eslint-disable-next-line no-nested-ternary
  return isFetching ? (
    <div className="w-full h-full text-center flex items-center justify-center bg-primary">
      <Spinner className="h-5 w-5 " color="deep-purple" />
    </div>
  ) : data ? (
    <div className="h-screen flex-grow p-0 overflow-auto">
      <BlockDraft version={data}>
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
          {editorMode === "preview" && data ? (
            <FloatingButtons
              version={data}
              className=" bottom-[100px] xs:bottom-[100px] "
            />
          ) : null}
        </>
      </BlockDraft>
    </div>
  ) : null;
};

export default EditorTab;
