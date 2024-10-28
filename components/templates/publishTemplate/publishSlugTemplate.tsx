import React, { ReactNode } from "react";

import { IThemeInfo } from "@interface/app.interface";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishSidebar from "@components/organisms/publishSidebar";

declare interface IProps {
  children: ReactNode;
  themeInfo: IThemeInfo;
  repoId: number;
  repoName: string;
}

const PublishSlugTemplate = ({
  children,
  themeInfo,
  repoId,
  repoName,
}: IProps) => {
  return (
    <>
      <PublishHeader themeInfo={themeInfo} />
      <div className="flex w-full">
        <PublishSidebar repoId={repoId} repoName={repoName} />
        <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto relative w-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default PublishSlugTemplate;
