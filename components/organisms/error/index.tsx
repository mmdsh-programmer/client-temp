"use client";

import React from "react";
import { Button } from "@components/ui/button";
import { FolderEmptyIcon } from "@components/atoms/icons";

interface IProps {
  error: { message: string };
  retry?: () => void;
}

const Error = ({ error, retry }: IProps) => {
  return (
    <div className="flex flex-col h-full mx-auto justify-center items-center gap-3 my-2">
      <FolderEmptyIcon />
      <div className="flex flex-col gap-1">
        <p className="title_t3 text-primary_normal">
          {error?.message || "خطای نامشخصی رخ داد"}
        </p>
      </div>
      {retry ? (
        <Button
          onClick={retry}
          className="mt-2 py-3 bg-primary-normal hover:bg-primary-normal active:bg-primary-normal text-white flex justify-center items-center w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg"
        >
          تلاش مجدد
        </Button>
      ) : null}
    </div>
  );
};

export default Error;
