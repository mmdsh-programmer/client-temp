import React from "react";
import { FolderEmptyIcon } from "@components/atoms/icons";

const NotFound = () => {
  return (
    <div
      className="h-screen w-screen"
    >
      <div
        className="h-full w-full flex justify-center items-center flex-col"
      >
        <FolderEmptyIcon />
        <h1 className="text-primary_normal text-2xl font-bold">
          404
        </h1>
        <h2
          className="text-primary_normal"
        >
          صفحه مورد نظر پیدا نشد
        </h2>
      </div>
    </div>
  );
};

export default NotFound;