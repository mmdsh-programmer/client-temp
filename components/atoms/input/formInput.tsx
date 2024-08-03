import React from "react";
import { Input } from "@material-tailwind/react";

interface IProps {
  className?: string;
  placeholder?: string;
  register?: any
  [key: string]: any;
}

const FormInput = ({ className, placeholder, register, ...restProps }: IProps) => {
  return (
    <Input
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "min-w-0 !h-12",
      }}
      type="text"
      placeholder={placeholder}
      {...restProps}
      {...register}
      className={`${className || ""}
      flex items-center !h-12 gap-2 pr-3 pl-2
      !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
       font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:text-placeholder text-right
       !bg-gray-50 border-[1px] !border-normal focus:!border-normal`}
    />
  );
};

export default FormInput;
