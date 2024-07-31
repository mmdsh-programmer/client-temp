import React from "react";
import { Input } from "@material-tailwind/react";

interface IProps {
  className?: string;
  placeholder?: string;
  register?: any;
  setValue?: (value: any) => void;
  id?: string;
}

const InputAtom = ({
  className,
  placeholder,
  register,
  setValue,
  id,
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
      id={id}
      type="text"
      placeholder={placeholder}
      {...register}
      onChange={(e) => {
        setValue?.(e.target.value);
      }}
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
