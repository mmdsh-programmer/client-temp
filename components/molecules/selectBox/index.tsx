/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon } from "@components/atoms/icons";

interface IProps {
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: (options: any[]) => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (option: string) => {
    if (singleSelect) {
      setSelectedOptions([option]);
      setIsOpen(false);
    } else {
      setSelectedOptions(
        selectedOptions.includes(option)
          ? selectedOptions.filter((selected) => {
              return selected !== option;
            })
          : [...selectedOptions, option]
      );
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${className || ""} relative inline-block `}
    >
      <button
        onClick={toggleDropdown}
        className={`w-full h-full truncate text-[13px] font-iranYekan py-1 pl-1 pr-2 
          flex justify-between font-normal items-center text-left bg-white border-2 border-normal
          ${disabled ? "!bg-gray-100 text-gray-300" : ""} rounded-md focus:outline-none`}
        disabled={disabled}
      >
        <span className="max-w-min truncate">
          {selectedOptions.length > 0
            ? selectedOptions
                .map((selected) => {
                  return options.find((option) => {
                    return option.value === selected;
                  })?.label;
                })
                .join(", ")
            : defaultOption}
        </span>
        {selectedOptions
          ? options?.find((option) => {
              return option.value === selectedOptions;
            })?.label
          : defaultOption}
        <ChevronLeftIcon
          className={`w-2 h-2 stroke-icon-active transform transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-[99999] mt-2 min-w-max w-full p-[1px] rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="rounded-md p-1 text-right shadow-menu overflow-auto focus:outline-none"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {options.map((option) => {
              return (
                <li
                  key={option.value}
                  className="cursor-pointer select-none relative p-[6px]"
                  onClick={() => {
                    return handleOptionChange(option.value);
                  }}
                >
                  <div className="flex items-center">
                    <Checkbox
                      containerProps={{
                        className: "p-1",
                      }}
                      placeholder="checkbox"
                      className="p-0"
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => {
                        return handleOptionChange(option.value);
                      }}
                      color="deep-purple"
                      crossOrigin=""
                    />
                    <Typography className="select_option__text truncate text-right text-primary_normal">
                      {option.label}
                    </Typography>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
