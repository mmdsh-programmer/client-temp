import React from "react";
import { Input } from "@material-tailwind/react";

interface IProps {
  className?: string;
  placeholder?: string;
  register?: any;
  setValue?: (value: any) => void;
  id?: string;
}

const NumberInput = ({ className, placeholder, register, setValue, id }: IProps) => {
  return (
    <Input
      crossOrigin=""
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      containerProps={{
        className: "min-w-0 !h-12",
      }}
      id={id}
      min={0}
      type="number"
      placeholder={placeholder}
      {...register}
      onChange={(e) => {
        setValue?.(e.target.value);
      }}
      className={`${className || ""}
      flex items-center !h-12 gap-2 pr-3 pl-2
      !font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
       font-normal text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:text-placeholder text-right
       !bg-gray-50 border-[1px] !border-normal focus:!border-normal`}
    />
  );
};

export default NumberInput;
