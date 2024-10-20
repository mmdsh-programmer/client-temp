/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

interface IProps {
  extension: string;
}

const FileIconAtom = ({ extension }: IProps) => {
  return (
    <div className="w-32 mb-4 mx-auto">
      <FileIcon extension={extension} {...(defaultStyles as any)[extension]} />
    </div>
  );
};

export default FileIconAtom;
