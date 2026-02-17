import React from "react";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import TextareaAtom from "@/components/atoms/textarea";
import { UseFormRegister } from "react-hook-form";
import { IDomainTheme } from "@interface/domain.interface";

interface BasicInfoProps {
  domain: IDomainTheme;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: UseFormRegister<IDomainTheme>;
}

const BasicInfo = ({ domain, onInputChange, register }: BasicInfoProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
          نام دامنه
        </Typography>
        <FormInput
          placeholder="نام دامنه"
          register={{
            ...register("name"),
          }}
          className="domain-edit__form-name"
          value={domain.name}
          onChange={onInputChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
          توضیحات دامنه
        </Typography>
        <TextareaAtom
          placeholder="توضیحات دامنه"
          {...register("description")}
          className="domain-edit__form-description"
          value={domain.description}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
