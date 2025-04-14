"use client";

import React from "react";
import { IFile } from "@interface/file.interface";
import FilePreviewWrapper from "@components/molecules/filePreviewWrapper";
import FileDetails from "@components/molecules/fileDetails";

interface IProps {
  file:
    | IFile
    | { name: string; extension: string; hash: string; size?: number };
  showIcon?: boolean;
  isPublic?: boolean;
}

const PreviewFile = ({ file, showIcon, isPublic = false }: IProps) => {
  return (
    <div className="flex-col items-center w-full justify-center">
      <FilePreviewWrapper file={file} showIcon={showIcon} isPublic={isPublic} />
      <FileDetails
        name={file.name}
        extension={file.extension}
        size={file.size}
      />
    </div>
  );
};

export default PreviewFile;
