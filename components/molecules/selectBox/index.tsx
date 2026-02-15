"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/utils/cn";
import { ChevronLeftIcon } from "@components/atoms/icons";

export interface ISelectOption {
  label: string;
  value: string | number;
}

interface IProps {
  options: ISelectOption[];
  selectedOptions: (string | number)[];
  setSelectedOptions: (options: (string | number)[]) => void;
  defaultOption: string;
  className?: string;
  disabled?: boolean;
  singleSelect?: boolean;
}

const SelectBox = ({
  options,
  selectedOptions,
  setSelectedOptions,
  defaultOption,
  className,
  disabled,
  singleSelect = false,
}: IProps) => {
  const [open, setOpen] = useState(false);

  const handleOptionChange = (optionValue: string | number) => {
    if (singleSelect) {
      setSelectedOptions([optionValue]);
      setOpen(false);
    } else {
      setSelectedOptions(
        selectedOptions.includes(optionValue)
          ? selectedOptions.filter((selected) => {
              return selected !== optionValue;
            })
          : [...selectedOptions, optionValue],
      );
    }
  };

  const displayLabel =
    selectedOptions.length > 0
      ? selectedOptions
          .map((selected) => {
            return options.find((opt) => {
              return opt.value === selected;
            })?.label;
          })
          .join(", ")
      : defaultOption;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "group flex h-full w-full items-center justify-between truncate border-2 border-normal bg-inherit py-1 pl-1 pr-2 text-left font-iranYekan text-[13px] font-normal focus:outline-none [&_svg]:size-2",
            disabled && "!bg-gray-100 text-gray-300",
            className,
          )}
        >
          <span className="max-w-min truncate">{displayLabel}</span>
          <ChevronLeftIcon
            className={cn(
              "h-2 w-2 -rotate-90 transform stroke-icon-active transition-transform group-data-[state=open]:rotate-90",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "z-[99999] mt-2 w-full min-w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)] p-0",
          "max-h-[200px] min-h-[60px] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
        )}
        align="start"
      >
        <Command
          className="rounded-md border-0 bg-transparent font-iranYekan text-[13px]"
          dir="rtl"
        >
          <CommandInput
            placeholder="جستجو..."
            className="h-9 border-0 border-b border-gray-200 bg-transparent focus:border-primary focus:ring-0"
          />
          <CommandList className="max-h-[150px]">
            <CommandEmpty className="py-4 text-center text-sm text-gray-400">
              موردی یافت نشد
            </CommandEmpty>
            <CommandGroup className="p-1 text-right">
              {options.map((option) => {
                const isSelected = selectedOptions.includes(option.value);
                return (
                  <CommandItem
                    key={String(option.value)}
                    value={option.label}
                    onSelect={() => {
                      handleOptionChange(option.value);
                    }}
                    className="cursor-pointer gap-2 rounded-sm px-2 py-1.5 text-right text-primary_normal"
                  >
                    <Checkbox
                      checked={isSelected}
                      className="pointer-events-none shrink-0"
                      aria-hidden
                    />
                    <span className="select_option__text truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectBox;
