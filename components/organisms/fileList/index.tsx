import React from "react";
import { IFile } from "cls-file-management";
import FileItem from "@components/molecules/fileItem";

interface IProps {
  files: IFile[];
  onDelete: (file: IFile) => void;
  isDeleting: boolean;
  userToken: string;
}

const FileList = ({ files, onDelete, isDeleting, userToken }: IProps) => {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-320px)] overflow-auto">
      {files.map((file) => {
        return (
          <FileItem
            key={file.name}
            file={file}
            onDelete={onDelete}
            isDeleting={isDeleting}
            userToken={userToken}
          />
        );
      })}
    </div>
  );
};

export default FileList;
