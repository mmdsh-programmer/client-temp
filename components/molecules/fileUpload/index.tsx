import React, { ChangeEvent } from "react";

import { Typography } from "@material-tailwind/react";

interface IProps {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  progress: number;
}

const FileUpload = ({ progress, onUpload }: IProps) => {
  return (
    <label
      htmlFor="input-file"
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px] border-normal"
    >
      <div className="flex w-full">
        <div className="relative flex !h-12 !w-full items-center justify-center rounded-lg bg-primary-light hover:bg-primary-light active:bg-primary-light">
          <Typography
            placeholder=""
            className="text__label__button text-primary"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            بارگذاری فایل ضمیمه
          </Typography>
          {progress > 0 && progress < 100 ? (
            <div
              className="absolute inset-0 !h-12 rounded-lg bg-primary-normal px-6 opacity-50"
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          ) : null}
        </div>
      </div>
      <input type="file" id="input-file" className="hidden" onChange={onUpload} accept="image/*" />
    </label>
  );
};

export default FileUpload;
