import React from "react";
import ClientSideProvider from "provider/clientSideProvider";
import ConnectRemoteEditor from "@components/organisms/publish/connectRemoteEditor";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { IGetSpecificVersion } from "clasor-content-preview/dist/interface/contentPreview.interface";
import { IVersion } from "@interface/version.interface";
import PublishBottomNav from "@components/organisms/publishBottomNav";
import PublishFeeback from "@components/organisms/publishFeedback";
import PublishOutlineDrawer from "@components/organisms/publishBottomNav/publishOutlineDrawer";
import PublishVersion from "../../organisms/publish/publishVersion";
import RenderClientContent from "@components/organisms/publish/renderClientContent";
import { RenderServerSideContent } from "clasor-content-preview";
import PublishFilePreview from "@components/organisms/publish/publishFilePreview";
import PublishFilesDrawer from "@components/organisms/publishBottomNav/publishFilesDrawer";
import { sanitizeHtmlOnServer } from "@utils/sanitizeHtml";

interface IProps {
  version: IVersion;
  document: IDocumentMetadata;
}

const PublishVersionContent = async ({ version, document }: IProps) => {
  const versionForRender =
    version.contentType === EDocumentTypes.classic
      ? sanitizeHtmlOnServer(version.content || "")
      : version;

  const cleanVersion =
    version.contentType === EDocumentTypes.classic
      ? { ...version, content: versionForRender }
      : version;

  return (
    <>
      <section className="scroller relative grid min-h-full w-full gap-2 overflow-y-auto">
        <PublishVersion document={document} version={version} />
        {(() => {
          switch (version.contentType) {
            case EDocumentTypes.classic:
              return (
                <>
                  <RenderClientContent versionData={cleanVersion as IVersion} />
                  <RenderServerSideContent
                    className="min-h-full"
                    versionData={cleanVersion as IGetSpecificVersion}
                  />
                </>
              );
            case EDocumentTypes.file:
              return <PublishFilePreview fileInfo={version.fileHash!} />;
            default:
              return (
                <ClientSideProvider>
                  <ConnectRemoteEditor versionData={version} />
                </ClientSideProvider>
              );
          }
        })()}
        <PublishFeeback postId={version.postId} />
        <PublishBottomNav />
      </section>
      <PublishOutlineDrawer outline={version.outline || "[]"} />
      <PublishFilesDrawer version={version} />
    </>
  );
};

export default PublishVersionContent;
