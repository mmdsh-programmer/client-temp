import React from "react";
import { IVersion } from "@interface/version.interface";
import { EDocumentTypes } from "@interface/enums";
import { RenderServerSideContent } from "clasor-content-preview";
import { IGetSpecificVersion } from "clasor-content-preview/dist/interface/contentPreview.interface";
import ConnectRemoteEditor from "@components/organisms/publish/connectRemoteEditor";
import RenderClientContent from "@components/organisms/publish/renderClientContent";
import PublishVersion from "../../organisms/publish/publishVersion";
import PublishTinyLink from "@components/organisms/publish/publishTinyLink";
import { IDocumentMetadata } from "@interface/document.interface";
import PublishOutlineDrawer from "@components/organisms/publishBottomNav/publishOutlineDrawer";
import PublishBottomNav from "@components/organisms/publishBottomNav";
import PublishFeeback from "@components/organisms/publishFeedback";

interface IProps {
  version: IVersion;
  document: IDocumentMetadata;
}

const PublishVersionContent = ({ version, document }: IProps) => {
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
          <ConnectRemoteEditor versionData={version} />
        )}
        <PublishTinyLink />
        <PublishFeeback />
        <PublishBottomNav />
      </section>
      <PublishOutlineDrawer outline={version.outline || "[]"} />
    </>
  );
};

export default PublishVersionContent;
