import React from "react";
import { FolderEmptyIcon } from "@components/atoms/icons";

const NotFoundTemplate = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <FolderEmptyIcon />
        <h1 className="text-2xl font-bold text-primary_normal">404</h1>
        <h2 className="text-primary_normal">صفحه مورد نظر پیدا نشد</h2>
      </div>
    </div>
  );
};

export default NotFoundTemplate;
