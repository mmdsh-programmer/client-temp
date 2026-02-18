import React, { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@utils/cn";

const FormInput = ({ className, ...restProps }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Input
      type="text"
      className={cn(
        className,
        "flex items-center h-12 gap-2 pr-3 pl-2 placeholder:!opacity-100 font-iranYekan font-normal text-primary_normal text-[13px] leading-[18.2px] -tracking-[0.13px] placeholder:!text-placeholder placeholder:text-[13px] text-right bg-gray-50 border-[1px] border-normal"
      )}
      {...restProps}
    />
  );
};

export default FormInput;
