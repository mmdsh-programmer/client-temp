import React from "react";
import { Textarea, TextareaProps } from "@material-tailwind/react";

interface IProps extends TextareaProps {
  register: any;
}

const TextareaAtom = ({ register, ...otherProps }: IProps) => {
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
      className={`${otherProps.className || ""} 
      flex items-center !h-12 gap-2 !p-3
      !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
       font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
       placeholder:text-placeholder text-right
       !bg-gray-50 border-[1px] !border-normal focus:!border-normal focus:border-t-current`}
      {...otherProps}
    />
  );
};

export default TextareaAtom;
