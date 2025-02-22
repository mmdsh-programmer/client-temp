import React, { ReactNode } from "react";

import ClientSideProvider from "provider/clientSideProvider";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishSidebarWrapper from "@components/organisms/publishSidebar";
import PublishSidebarContent from "@components/organisms/publishSidebar/sidebarContent";


declare interface IProps {
  children: ReactNode;
  projectName?: string;
  logo?: string;
  domain: string;
}

const PublishSlugTemplate = ({
  children,
  projectName,
  logo,
  domain,
}: IProps) => {
  return (
    <>
      <PublishHeader projectName={projectName} logo={logo} domain={domain} />
      <main className="flex w-full h-[calc(100vh-81px)]">
          <ClientSideProvider>
            <PublishSidebarWrapper>
              <PublishSidebarContent />
            </PublishSidebarWrapper>
          </ClientSideProvider>
          <section className="h-full overflow-y-auto w-full">
            {children}
          </section>
        
      </main>
    </>
  );
};

export default PublishSlugTemplate;
