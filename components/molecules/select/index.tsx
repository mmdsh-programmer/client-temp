"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@utils/cn";

export interface IOption {
  label: string;
  value: string | number;
  className?: string;
}

interface IProps {
  options?: IOption[];
  selectedOption?: IOption;
  setSelectedOption: (option: IOption) => void;
  defaultOption?: IOption;
  className?: string;
  onMenuScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  isLoading?: boolean;
}

const SelectAtom = ({
  options = [],
  selectedOption,
  setSelectedOption,
  defaultOption,
  className,
  onMenuScroll,
  isLoading,
}: IProps) => {
  const value = selectedOption != null ? String(selectedOption.value) : "";

  const handleValueChange = (next: string) => {
    const option = options.find((o) => {
      return String(o.value) === next;
    });
    if (option) {
      setSelectedOption(option);
    }
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-x-2 truncate rounded-md bg-transparent font-iranYekan text-[13px] font-normal leading-[18.2px] -tracking-[0.13px] text-primary_normal focus:!ring-0",
          className,
        )}
        dir="rtl"
      >
        <SelectValue placeholder={defaultOption?.label} />
      </SelectTrigger>
      <SelectContent
        dir="rtl"
        className="max-h-[150px] text-right"
        onScroll={onMenuScroll}
        position="popper"
      >
        {options.map((option) => {
          return (
            <SelectItem
              key={String(option.value)}
              value={String(option.value)}
              title={option.label}
              className={cn(
                "select_option__text cursor-pointer text-right text-primary_normal",
                option.className,
              )}
              dir="rtl"
            >
              {option.label}
            </SelectItem>
          );
        })}
        {isLoading && (
          <div className="flex justify-center p-2">
            <Spinner className="h-4 w-4 text-primary" />
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectAtom;
