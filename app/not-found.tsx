import { FolderEmptyIcon } from "@components/atoms/icons";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <FolderEmptyIcon />
        صفحه مورد نظر پیدا نشد
      </div>
    </div>
  );
};

export default NotFound;