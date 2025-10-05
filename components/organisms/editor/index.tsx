import React, { useRef, useState } from "react";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { usePathname, useSearchParams } from "next/navigation";
import DocumentEnableUserGroup from "../editorDrawer/documentEnableUserGroup";
import { EDocumentTypes } from "@interface/enums";
import EditorDrawer from "../editorDrawer";
import FileEditor from "./fileEditor";
import FloatingButtons from "./floatingButtons";
import { IClassicData } from "clasor-remote-editor/dist/interface";
import { IVersion } from "@interface/version.interface";
import { Spinner } from "@components/atoms/spinner";
import TemplateContentDialog from "../dialogs/templateContent/templateContentDialog";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import useSetUserMetadata from "@hooks/auth/useSetUserMetadata";
import RemoteEditorWithLoader from "./remoteEditorWithLoader";

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

  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();
  const {
    editorMode,
    editorDecryptedContent: decryptedContent,
    editorListDrawer: listDrawer,
  } = useEditorStore();

  const repoId = useRepoId();
  const { data: userInfo, isLoading } = useGetUser();
  const setUserMetadataHook = useSetUserMetadata();

  const content = selectedDocument?.publicKeyId ? decryptedContent : version?.content || " ";

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
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === selectedDocument?.repoId)
    ) {
      return userInfo!.repository.userGroupHash;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== selectedDocument?.repoId)
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
            userHasDirectAccess:
              currentPath === "/admin/sharedDocuments" ||
              sharedDocuments === "true" ||
              (currentPath === "/admin/dashboard" &&
                userInfo?.repository.id !== selectedDocument?.repoId),
            documentHasDirectAccess: selectedDocument.hasDirectAccess,
          },
          publicUserGroupHash: repoGroupHash() || undefined,
          privateUserGroupHash: undefined,
          repositoryId: repoId,
          resourceId: selectedDocument.id || undefined,
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
      <RemoteEditorWithLoader
        url={`${getEditorConfig().url}?timestamp=${timestampRef.current}`}
        editorMode={editorMode}
        refObj={getEditorConfig().ref}
        loadData={getLoadData() as IClassicData}
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
      <div className="main flex h-full w-full items-center justify-center text-center">
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full bg-white">
      {currentPath === "/admin/sharedDocuments" || sharedDocuments === "true" ? (
        <DocumentEnableUserGroup />
      ) : null}
      {listDrawer && getEditorConfig().ref ? (
        <div className="editor-sidebar-wrapper w-full xs:w-[300px]">
          <EditorDrawer version={versionData} />
        </div>
      ) : null}
      <div className={`${listDrawer ? "w-0 sm:w-[calc(100vw-300px)]" : "w-full"} h-full`}>
        {renderContent()}
        {version ? <FloatingButtons editorRef={getEditorConfig().ref} /> : null}
      </div>
      {openTemplateDialog ? (
        <TemplateContentDialog setOpen={setOpenTemplateDialog} editorRef={getEditorConfig().ref} />
      ) : null}
    </div>
  );
};

export default EditorComponent;
