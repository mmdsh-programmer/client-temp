import React, { ComponentProps } from "react";
import { Textarea } from "@components/ui/textarea";

const TextareaAtom = ({ className, ...otherProps }: ComponentProps<typeof Textarea>) => {
  return (
    <Textarea
      className={`${className || ""} min-w-0
        flex items-center gap-2 px-3 py-2 placeholder:opacity-100
        font-iranYekan focus:font-iranYekan placeholder:font-iranYekan
        font-normal text-primary_normal text-[13px] leading-[18.2px] -tracking-[0.13px]
        placeholder:text-placeholder text-right
        bg-gray-50 border border-normal focus:border-normal focus-visible:ring-0 focus-visible:ring-offset-0`}
      {...otherProps}
    />
  );
};

export default TextareaAtom;
