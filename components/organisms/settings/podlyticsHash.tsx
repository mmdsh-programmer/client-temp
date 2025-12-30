import React from "react";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { UseFormRegister } from "react-hook-form";
import { IDomainTheme } from "@interface/domain.interface";

interface PodlyticsHashProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: UseFormRegister<IDomainTheme>;
  podlyticsHash: string | null;
}

const PodlyticsHash = ({ onInputChange, register, podlyticsHash }: PodlyticsHashProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
        شناسه پروژه در podtytics
      </Typography>
      <FormInput
        placeholder="شناسه پروژه در podtytics"
        register={{
          ...register("podlyticsHash"),
        }}
        className="domain-edit__form-podlyticsHash"
        value={podlyticsHash ?? ""}
        onChange={onInputChange}
      />
    </div>
  );
};

export default PodlyticsHash;
