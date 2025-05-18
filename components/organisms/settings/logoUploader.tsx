import React from "react";
import { Typography } from "@material-tailwind/react";
import { UploadIcon } from "@components/atoms/icons";

interface LogoUploaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogoUploader = ({ onChange }: LogoUploaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography className="form_label">لوگو</Typography>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="input-file"
          className="flex h-[72px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-[1px] border-normal"
        >
          <UploadIcon className="h-5 w-5 stroke-icon-active" />
          <div className="flex gap-[3px]">
            <Typography className="select_option__text text-[#0369CD]">
              برای آپلود کلیک کنید
            </Typography>
          </div>
          <input
            type="file"
            id="input-file"
            className="domain__upload-file-input hidden"
            onChange={onChange}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

export default LogoUploader; 