"use client";

import React from "react";
import PreviewFile from "../editor/previewFile";
import { Typography } from "@material-tailwind/react";
import { DownloadIcon } from "@components/atoms/icons";

interface IProps {
  fileInfo: {
    fileExtension: string;
    fileName: string;
    hash: string;
  };
}

const PublishFilePreview = ({ fileInfo }: IProps) => {
  const source = `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${
    fileInfo.hash
  }`;
  return (
    <div className="publish-file-preview overflow-x-auto px-1 h-[calc(100vh-81px)]">
      <PreviewFile
        file={{
          name: fileInfo.fileName,
          extension: fileInfo.fileExtension,
          hash: fileInfo.hash,
        }}
        isPublic
      />
      <div className="flex gap-2 mt-4 items-center justify-center">
        <Typography className="title_t2 !text-primary">دانلود فایل</Typography>
        <a
          href={source}
          download
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=""
          target="_blank"
          rel="noreferrer"
        >
          <DownloadIcon className="h-5 w-5 stroke-white" />
        </a>
      </div>
    </div>
  );
};

export default PublishFilePreview;
