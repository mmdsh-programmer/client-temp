import React, { useRef } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import { EDocumentTypes } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import {
  editorDataAtom,
  editorModeAtom,
  editorVersionAtom,
} from "@atom/editor";
import { repoAtom } from "@atom/repository";
import { category } from "@atom/category";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@material-tailwind/react";

interface IProps {
  getEditorConfig: () => {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  };
}

const EditorComponent = ({ getEditorConfig }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedCategory = useRecoilValue(category);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const selectedVersion = useRecoilValue(editorVersionAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);

  const timestampRef = useRef(Date.now());

  const { data: userInfo, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="main w-full h-full text-center flex items-center justify-center">
        <Spinner className="h-5 w-5 " color="deep-purple" />
      </div>
    );
  }

  return (
    <RemoteEditor
      url={`${getEditorConfig().url}?timestamp=${timestampRef.current}`}
      editorMode={editorMode}
      ref={getEditorConfig().ref}
      loadData={
        selectedDocument?.contentType === EDocumentTypes.classic
          ? ({
              content: selectedVersion?.content || " ",
              outline: selectedVersion?.outline || [],
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
          : selectedVersion?.content
      }
    />
  );
};

export default EditorComponent;
