import React from "react";
import { Typography } from "@material-tailwind/react";
import { fileSize } from "@utils/index";

interface IProps {
  name: string;
  extension: string;
  size?: number;
}

const FileDetails = ({ name, extension, size }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 text-center mt-2">
      <div className="flex items-center gap-2">
        <Typography className="title_t2 text-primary_normal">نام فایل: </Typography>
        <div className="flex gap-0">
          <Typography className="title_t4 text-secondary">
            {name}
            {extension ? `.${extension}` : null}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Typography className="title_t2 text-primary_normal">حجم فایل: </Typography>
        <Typography className="title_t4 text-secondary">
          {size ? fileSize(size) : "--"}
        </Typography>
      </div>
    </div>
  );
};

export default FileDetails;
