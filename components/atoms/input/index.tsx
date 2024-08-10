import React from "react";
import { Input, InputProps } from "@material-tailwind/react";

interface IProps extends InputProps {
  register?: any;
}

const InputAtom = ({ register, ...restProps }: IProps) => {
  return (
    <Input
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "!min-w-0 !h-12 ",
      }}
      type="text"
      {...register}
      className={`${restProps.className || ""}
      flex items-center !min-w-0 !h-12 gap-2 pr-3 pl-2
      !font-iranYekan focus:font-iranYekan placeholder:!font-iranYekan
       font-normal text-primary text-[13px] placeholder:!text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:!text-hint text-right 
        `}
      {...restProps}
    />
  );
};

export default InputAtom;
