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
import React from "react";
import RenderClientContent from "@components/organisms/publish/renderClientContent";
import { RenderServerSideContent } from "clasor-content-preview";

interface IProps {
  version: IVersion;
  document: IDocumentMetadata;
}

const PublishVersionContent = async ({ version, document }: IProps) => {
  return (
    <>
      <section className="scroller grid gap-2 relative w-full overflow-y-auto min-h-full">
        <PublishVersion document={document} version={version} />
        {version.contentType === EDocumentTypes.classic ? (
          <>
            <RenderClientContent versionData={version} />
            <RenderServerSideContent
              className="min-h-full"
              versionData={version as IGetSpecificVersion}
            />
          </>
        ) : (
          <ClientSideProvider>
            <ConnectRemoteEditor versionData={version} />
          </ClientSideProvider>
        )}
        <PublishFeeback postId={version.postId} />
        <PublishBottomNav />
      </section>
      <PublishOutlineDrawer outline={version.outline || "[]"} />
    </>
  );
};

export default PublishVersionContent;
