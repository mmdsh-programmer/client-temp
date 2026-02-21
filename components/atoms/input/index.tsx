import React from "react";
import { Input } from "@components/ui/input";
import { cn } from "@utils/cn";

const InputAtom = ({ className, ...restProps }: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      className={cn(
        "flex items-center gap-2 border-[1px] border-normal pl-2 pr-3 text-right !font-iranYekan text-[13px] font-normal leading-[18.2px] -tracking-[0.13px] text-primary_normal !outline-0 placeholder:font-iranYekan placeholder:text-[13px] placeholder:!text-placeholder placeholder:!opacity-100 focus:border-normal focus:font-iranYekan focus:outline-0",
        className,
      )}
      {...restProps}
    />
  );
};

export default InputAtom;
