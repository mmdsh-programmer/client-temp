import React, { ChangeEvent } from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = ({ onUpload }: IProps) => {
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
