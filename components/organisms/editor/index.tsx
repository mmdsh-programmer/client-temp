import React, { useRef } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import {
  editorDataAtom,
  editorDecryptedContentAtom,
  editorListDrawerAtom,
  editorModeAtom,
} from "@atom/editor";
import { EDocumentTypes } from "@interface/enums";
import { IClassicData } from "clasor-remote-editor/dist/interface";
import { IVersion } from "@interface/version.interface";
import { Spinner } from "@material-tailwind/react";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";
import FloatingButtons from "./floatingButtons";
import EditorDrawer from "../editorDrawer";

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
  const decryptedContent = useRecoilValue(editorDecryptedContentAtom);
  const listDrawer = useRecoilValue(editorListDrawerAtom);

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
    <div className="flex h-full relative bg-primary">
      {listDrawer ? <div className="w-full xs:w-[300px]"><EditorDrawer version={version} /></div> : null}
     <div className={`${listDrawer ? "w-0 sm:w-[calc(100vw-300px)]" : "w-full"}`}>
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
              } as IClassicData)
            : content
        }
      />
      </div>
      <FloatingButtons
        version={version}
      />
    </div>
  );
};

export default EditorComponent;
