import { Button, Typography } from "@material-tailwind/react";
import { DeleteIcon, DownloadIcon } from "@components/atoms/icons";

import { IFile } from "cls-file-management";
import React from "react";

interface IProps {
  file: IFile;
  onDelete: (file: IFile) => void;
  isDeleting: boolean;
  userToken: string;
}

const FileItem = ({ file, isDeleting, onDelete, userToken }: IProps) => {
  const fileSizeInKB = file.size / 1000;
  const fileSizeInMB = fileSizeInKB / 1000;

  return (
    <div className="w-full flex gap-2 justify-between items-center p-4 rounded-lg border-normal border-[1px]">
      <div className="flex flex-col flex-grow items-start max-w-[90%]">
        <Typography
          placeholder=""
          className="title_t2 text-primary_normal truncate max-w-full"
          dir="ltr"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {file.name}
        </Typography>
        <div className="flex items-center gap-1">
          <a
            className="p-0 bg-transparent"
            download
            href={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${file.hash}?&checkUserGroupAccess=true&Authorization=${userToken}&time=${Date.now()}`}
            onClick={(e) => {
              return e.stopPropagation();
            }}
          >
            <DownloadIcon className="h-5 w-5 pt-1" />
          </a>
          <Typography
            placeholder=""
            className="title_t4 text-hint"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            {fileSizeInKB < 1000
              ? `${fileSizeInKB.toFixed(2)} KB`
              : `${fileSizeInMB?.toFixed(2)} MB`}
          </Typography>
        </div>
      </div>
      <Button
        placeholder=""
        className="bg-transparent !p-0"
        onClick={() => {
          return onDelete(file);
        }}
        disabled={isDeleting}
        {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
      >
        <DeleteIcon className="h-5 w-5 fill-icon-hover" />
      </Button>
    </div>
  );
};

export default FileItem;
