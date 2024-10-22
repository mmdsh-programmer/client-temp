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
      className="gap-2 justify-center items-center rounded-lg border-normal border-[1px] cursor-pointer"
    >
      <div className="!w-full !h-12 flex justify-center items-center bg-purple-light rounded-lg hover:bg-purple-light active:bg-purple-light">
        <Typography className="text__label__button text-purple-normal">
          بارگذاری فایل ضمیمه
        </Typography>
      </div>
      <div
          className="absolute inset-0 h-full rounded-lg"
          style={{
            backgroundColor: progress > 0 ? "#7446B2" : "transparent",
            width: `${progress}%`,
            transition: "width 0.3s ease",
          }}
        />
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
