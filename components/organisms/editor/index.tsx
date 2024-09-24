import React, { useRef } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import { EDocumentTypes } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import {
  editorChatDrawerAtom,
  editorDataAtom,
  editorDecryptedContentAtom,
  editorModeAtom,
} from "@atom/editor";
import { repoAtom } from "@atom/repository";
import { categoryAtom } from "@atom/category";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@material-tailwind/react";
import { IVersion } from "@interface/version.interface";
import ChatDrawer from "../like&comment/chatDrawer";

interface IProps {
  getEditorConfig: () => {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  };
  version?: IVersion;
}

const EditorComponent = ({ getEditorConfig, version }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedCategory = useRecoilValue(categoryAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const selectedVersion = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const chatDrawer = useRecoilValue(editorChatDrawerAtom);
  const decryptedContent = useRecoilValue(editorDecryptedContentAtom);

  const timestampRef = useRef(Date.now());

  const { data: userInfo, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="main w-full h-full text-center flex items-center justify-center">
        <Spinner className="h-5 w-5 " color="deep-purple" />
      </div>
    );
  }

  const content = selectedDocument?.publicKeyId
    ? decryptedContent
    : selectedVersion?.content;

  return (
    <div className="flex h-full">
      <RemoteEditor
        url={`${getEditorConfig().url}?timestamp=${timestampRef.current}`}
        editorMode={editorMode}
        ref={getEditorConfig().ref}
        loadData={
          selectedDocument?.contentType === EDocumentTypes.classic
            ? ({
                content: version?.content || " ",
                outline: version?.outline || [],
                auth: {
                  accessToken: userInfo?.access_token,
                  refreshToken: userInfo?.refresh_token,
                  url: `${process.env.NEXT_PUBLIC_CLASOR}/auth/renewToken`,
                },
                publicUserGroupHash: getRepo?.userGroupHash || undefined,
                privateUserGroupHash:
                  selectedCategory?.userGroupHash || undefined,
                repositoryId: getRepo?.id || undefined,
                resourceId: selectedCategory?.id || undefined,
                podspaceUrl: `${process.env.NEXT_PUBLIC_PODSPACE_API}`,
                backendUrl: `${process.env.NEXT_PUBLIC_CLASOR}/`,
              } as any)
            : content
        }
      />
      {chatDrawer ? <ChatDrawer /> : null}
    </div>
  );
};

export default EditorComponent;
