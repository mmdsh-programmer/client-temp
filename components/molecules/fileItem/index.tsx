import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { DownloadIcon } from "@components/atoms/icons";
import { IFile } from "cls-file-management";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/atoms/spinner";
import FileItemMenu from "./fileItemMenu";

interface IProps {
  file: IFile;
}

const FileItem = ({ file }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: userInfo } = useGetUser();

  const fileSizeInKB = file.size / 1000;
  const fileSizeInMB = fileSizeInKB / 1000;

  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg border-[1px] border-normal p-4">
      <div className="flex max-w-[80%] flex-grow flex-col items-start">
        <Typography
          placeholder=""
          className="title_t2 max-w-full truncate text-primary_normal"
          title={file.name}
          dir="ltr"
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {file.name}
        </Typography>
        <div className="flex items-center gap-1">
          <a
            className="bg-transparent p-0"
            download
            href={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${file.hash}?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`}
            onClick={(e) => {
              return e.stopPropagation();
            }}
          >
            <DownloadIcon className="h-5 w-5 pt-1" />
          </a>
          <Typography
            placeholder=""
            className="title_t4 text-hint"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            {fileSizeInKB < 1000
              ? `${fileSizeInKB.toFixed(2)} KB`
              : `${fileSizeInMB?.toFixed(2)} MB`}
          </Typography>
        </div>
      </div>
      {isLoading ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <FileItemMenu file={file} setIsLoading={setIsLoading} />
      )}
    </div>
  );
};

export default FileItem;
