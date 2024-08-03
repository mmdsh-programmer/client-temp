import React from "react";
import { Input } from "@material-tailwind/react";

interface IProps {
  className?: string;
  placeholder?: string;
  [key: string]: any;
}

const InputAtom = ({
  className,
  placeholder,
  ...restProps
}: IProps) => {
  return (
    <Input
      crossOrigin=""
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "!min-w-0 ",
      }}
      type="text"
      placeholder={placeholder}
      {...restProps}
      className={`${className || ""}
      flex items-center !min-w-0 
      !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
       font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:text-hint text-right focus:border-t-current
        `}
    />
  );
};

export default InputAtom;
