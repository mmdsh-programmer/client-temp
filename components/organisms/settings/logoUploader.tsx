import React from "react";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { UseFormRegister } from "react-hook-form";
import { IDomainTheme } from "@interface/domain.interface";

interface LogoUploaderProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: UseFormRegister<IDomainTheme>;
  logoHash?: string | null;
}

const LogoUploader = ({ onInputChange, register, logoHash }: LogoUploaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography className="form_label">لوگو</Typography>
      <FormInput
        placeholder="لوگو"
        register={{
          ...register("logo"),
        }}
        className="domain-edit__form-name"
        value={logoHash ?? ""}
        onChange={onInputChange}
      />
    </div>
  );
};

export default LogoUploader;
