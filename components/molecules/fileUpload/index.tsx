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
      className="gap-2 flex justify-center items-center rounded-lg border-normal border-[1px] cursor-pointer"
    >
      <div className="flex w-full">
        <div className="relative !w-full !h-12 flex justify-center items-center bg-primary-light rounded-lg hover:bg-primary-light active:bg-primary-light">
          <Typography
            placeholder=""
            className="text__label__button text-primary"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            بارگذاری فایل ضمیمه
          </Typography>
          <div
            className={`absolute !h-12 inset-0 rounded-lg px-6
               ${progress > 0 && progress < 100 ? "bg-secondary opacity-50" : "bg-transparent opacity-100"}
           `}
            style={{
              width: `${progress}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
      <input
        type="file"
        id="input-file"
        className="hidden"
        onChange={onUpload}
        accept="image/*"
      />
    </label>
  );
};

export default FileUpload;
