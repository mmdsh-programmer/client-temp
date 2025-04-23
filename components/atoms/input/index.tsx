/* eslint-disable @typescript-eslint/no-explicit-any */

import {
 Input,
 InputProps
} from "@material-tailwind/react";

import React from "react";

interface IProps extends InputProps {
  register?: any;
}

const InputAtom = ({
 register, className, ...restProps 
}: IProps) => {
  return (
    <Input
      labelProps={{className: "before:content-none after:content-none",}}
      containerProps={{className: "!min-w-0 flex-grow h-auto",}}
      type="text"
      {...register}
      className={`${className || ""}
        flex items-center gap-2 pr-3 pl-2 placeholder:!opacity-100
        !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
        font-normal text-primary_normal text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:!text-placeholder placeholder:text-[13px] text-right
         border-[1px] border-normal focus:border-normal !outline-0 focus:outline-0
        `}
      {...restProps}
    />
  );
};

export default InputAtom;
