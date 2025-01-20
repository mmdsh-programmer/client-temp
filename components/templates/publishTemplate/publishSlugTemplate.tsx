import React, { ReactNode } from "react";

import ClientSideProvider from "provider/clientSideProvider";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishSidebar from "@components/organisms/publishSidebar";

declare interface IProps {
  children: ReactNode;
  repoId: number;
  repoName: string;
  projectName?: string;
  logo?: string;
}

const PublishSlugTemplate = ({
  children,
  repoId,
  repoName,
  projectName,
  logo,
}: IProps) => {
  return (
    <>
      <PublishHeader projectName={projectName} logo={logo} />
      <main className="flex w-full h-[calc(100vh-81px)]">
          <ClientSideProvider>
            <PublishSidebar repoId={repoId} repoName={repoName} />
          </ClientSideProvider>
          <section className="h-full overflow-y-auto w-full">
            {children}
          </section>
        
      </main>
    </>
  );
};

export default PublishSlugTemplate;
