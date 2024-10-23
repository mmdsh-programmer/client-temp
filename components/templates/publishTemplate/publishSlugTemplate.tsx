import React, { ReactNode } from "react";

import { IThemeInfo } from "@interface/app.interface";
import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishSidebar from "@components/organisms/publishSidebar";

declare interface IProps {
  children: ReactNode;
  id: number;
  name: string;
  themeInfo: IThemeInfo;
}

const PublishSlugTemplate = ({ children, id, name, themeInfo }: IProps) => {
  return (
    <>
      <PublishHeader
        themeInfo={themeInfo}
      />
      <div className="flex w-full">
        <PublishSidebar
          id={id}
          name={name}
        />
        <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto relative w-full">
          {children}
        </main>
      </div>
      <PublishFooter themeInfo={themeInfo} />
    </>
  );
};

export default PublishSlugTemplate;
