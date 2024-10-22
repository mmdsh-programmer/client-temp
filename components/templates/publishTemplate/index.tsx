"use client";

import React, { ReactNode } from "react";

import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";
import useGetTheme from "@hooks/theme/useGetTheme";

declare interface IProps {
  children: ReactNode;
}

const PublishTemplate = ({ children }: IProps) => {
  const { data: themeInfo } = useGetTheme();
  if (themeInfo && "error" in themeInfo) {
    return (
      <div className="sticky top-0 w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-1 xs:order-2 min-w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <h1>خطا در دریافت اطلاعات دامنه</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <PublishHeader themeInfo={themeInfo} />
        <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto">{children}</main>
      <PublishFooter themeInfo={themeInfo} />
    </>
  );
};

export default PublishTemplate;
