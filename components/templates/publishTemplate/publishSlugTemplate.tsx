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
      <main className="flex w-full h-[calc(100vh-81px)]">
        <PublishSidebar repoId={repoId} repoName={repoName} />
        <section className="h-full overflow-y-auto w-full">
          {children}
        </section>
      </main>
    </>
  );
};

export default PublishSlugTemplate;
