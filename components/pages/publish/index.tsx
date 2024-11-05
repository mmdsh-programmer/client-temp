import React from "react";
import { IVersion } from "@interface/version.interface";
import { EDocumentTypes } from "@interface/enums";
import { RenderServerSideContent } from "clasor-content-preview";
import { IGetSpecificVersion } from "clasor-content-preview/dist/interface/contentPreview.interface";
import ConnectRemoteEditor from "@components/organisms/publish/connectRemoteEditor";
import RenderClientContent from "@components/organisms/publish/renderClientContent";
import PublishVersion from "./publishVersion";

interface IProps {
  version: IVersion;
}

const PublishVersionContent = ({ version }: IProps) => {
  return (
    <div className="scroller w-full overflow-y-auto">
      <PublishVersion version={version} />
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
    </div>
  );
};

export default PublishVersionContent;
