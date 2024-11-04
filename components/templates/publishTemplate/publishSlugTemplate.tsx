

import React, { ReactNode } from "react";
import { IThemeInfo } from "@interface/app.interface";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishSidebar from "@components/organisms/publishSidebar";
import PublishBottomNav from "@components/organisms/publishBottomNav";

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
      <main className="flex w-full">
        <PublishSidebar repoId={repoId} repoName={repoName} />
        <section className="h-[calc(100vh-156px)] overflow-y-auto relative w-full">
          {children}
        </section>
      </main>
      <PublishBottomNav />
    </>
  );
};

export default PublishSlugTemplate;
