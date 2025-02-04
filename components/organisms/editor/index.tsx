import React, { useRef, useState } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import {
  editorDecryptedContentAtom,
  editorListDrawerAtom,
  editorModeAtom,
} from "@atom/editor";
import { usePathname, useSearchParams } from "next/navigation";
import DocumentEnableUserGroup from "../editorDrawer/documentEnableUserGroup";
import { EDocumentTypes } from "@interface/enums";
import EditorDrawer from "../editorDrawer";
import FileEditor from "./fileEditor";
import FloatingButtons from "./floatingButtons";
import { IClassicData } from "clasor-remote-editor/dist/interface";
import { IVersion } from "@interface/version.interface";
import { Spinner } from "@material-tailwind/react";
import TemplateContentDialog from "../dialogs/templateContent/templateContentDialog";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";
import useSetUserMetadata from "@hooks/auth/useSetUserMetadata";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  getEditorConfig: () => {
    url: string;
    ref: React.RefObject<IRemoteEditorRef>;
  };
  version?: IVersion;
}

const EditorComponent = ({ getEditorConfig, version }: IProps) => {
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [versionData, setVersionData] = useState(version);

  const timestampRef = useRef(Date.now());
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const getRepo = useRecoilValue(repoAtom);
  const selectedCategory = useRecoilValue(categoryAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const decryptedContent = useRecoilValue(editorDecryptedContentAtom);
  const listDrawer = useRecoilValue(editorListDrawerAtom);

  const repoId = useRepoId();
  const { data: userInfo, isLoading } = useGetUser();
  const setUserMetadataHook = useSetUserMetadata();

  const content = selectedDocument?.publicKeyId
    ? decryptedContent
    : version?.content || " ";

  const handleChange = (value: { content: string; outline: string }) => {
    const { content: newContent, outline } = value;
    setVersionData((prev) => {
      if (!prev) return undefined;
      return { ...prev, content: newContent, outline };
    });
  };

  const handleSaveConfig = (newData: string) => {
    const newMetadata = JSON.parse(newData);
    setUserMetadataHook.mutate({
      data: newMetadata,
    });
  };

  const repoGroupHash = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.userGroupHash;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true"
    ) {
      return selectedDocument!.userGroupHash;
    }
    return getRepo!.userGroupHash;
  };

  const getLoadData = () => {
    switch (selectedDocument?.contentType) {
      case EDocumentTypes.classic:
        return {
          content: content || " ",
          outline: version?.outline || [],
          auth: {
            accessToken: userInfo?.access_token,
            refreshToken: userInfo?.refresh_token,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/renewToken`,
          },
          publicUserGroupHash: repoGroupHash() || undefined,
          privateUserGroupHash: selectedCategory?.userGroupHash || undefined,
          repositoryId: repoId || undefined,
          resourceId: selectedCategory?.id || undefined,
          podspaceUrl: `${process.env.NEXT_PUBLIC_PODSPACE_API}/`,
          backendUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
        } as IClassicData;
      case EDocumentTypes.word:
        return {
          username: userInfo?.username,
          content,
        };
      default:
        return content;
    }
  };

  const renderContent = () => {
    if (selectedDocument?.contentType === EDocumentTypes.file) {
      return <FileEditor />;
    }

    return (
      <RemoteEditor
        url={`${getEditorConfig().url}?timestamp=${timestampRef.current}`}
        editorMode={editorMode}
        ref={getEditorConfig().ref}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadData={getLoadData() as any}
        onGetConfig={handleSaveConfig}
        onChange={handleChange}
        loadHtml={() => {
          return setOpenTemplateDialog(true);
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="main w-full h-full text-center flex items-center justify-center">
        <Spinner className="h-5 w-5 " color="deep-purple" />
      </div>
    );
  }

  return (
    <div className="flex h-full relative bg-primary">
      {currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ? (
        <DocumentEnableUserGroup />
      ) : null}
      {listDrawer && getEditorConfig().ref ? (
        <div className="w-full xs:w-[300px]">
          <EditorDrawer
            version={versionData}
            editorRef={getEditorConfig().ref}
          />
        </div>
      ) : null}
      <div
        className={`${listDrawer ? "w-0 sm:w-[calc(100vw-300px)]" : "w-full"} h-full`}
      >
        {renderContent()}
        <FloatingButtons version={version} />
      </div>
      {openTemplateDialog ? (
        <TemplateContentDialog
          setOpen={setOpenTemplateDialog}
          editorRef={getEditorConfig().ref}
        />
      ) : null}
    </div>
  );
};

export default EditorComponent;
