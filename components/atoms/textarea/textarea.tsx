import React from "react";
import { Textarea, TextareaProps } from "@material-tailwind/react";

interface IProps extends TextareaProps {
  register?: any;
}

const TextareaAtom = ({ register, className, ...otherProps }: IProps) => {
  return (
    <Textarea
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "min-w-0",
      }}
      {...register}
      type="text"
      className={`${className || ""} 
      flex items-center gap-2 pr-3 pl-2 placeholder:!opacity-100
        !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
        font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:!text-placeholder placeholder:text-[13px] text-right
        !bg-gray-50 border-[1px] !border-normal focus:!border-normal`}
      {...otherProps}
    />
  );
};

export default TextareaAtom;
