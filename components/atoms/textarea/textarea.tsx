import React from "react";
import { Textarea } from "@material-tailwind/react";

interface IProps {
  className?: string;
  placeholder?: string;
  [key: string]: any;
}

const TextareaAtom = ({ className, placeholder, ...restProps }: IProps) => {
  return (
    <Textarea
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "min-w-0",
      }}
      placeholder={placeholder}
      {...restProps}
      className={`${className || ""} 
      flex items-center !h-12 gap-2 !p-3
      !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
       font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
       placeholder:text-placeholder text-right
       !bg-gray-50 border-[1px] !border-normal focus:!border-normal`}
    />
  );
};

export default TextareaAtom;
