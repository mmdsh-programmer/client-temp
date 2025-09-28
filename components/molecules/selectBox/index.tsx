/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import Checkbox from "@components/atoms/checkbox";

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
  const [searchValue, setSearchValue] = useState(""); // اضافه شد
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
          : [...selectedOptions, option],
      );
    }
  };

  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div ref={dropdownRef} className={`${className || ""} relative inline-block rounded-md`}>
      <button
        onClick={() => {
          toggleDropdown();
        }}
        className={`flex h-full w-full items-center justify-between truncate border-2 border-normal bg-inherit py-1 pl-1 pr-2 text-left font-iranYekan text-[13px] font-normal ${disabled ? "!bg-gray-100 text-gray-300" : ""} rounded-lg focus:outline-none`}
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
        <ChevronLeftIcon
          className={`h-2 w-2 transform stroke-icon-active transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-[99999] mt-2 max-h-[200px] min-h-[60px] w-full min-w-max overflow-visible rounded-md bg-white p-[1px] shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="sticky top-0 z-10 bg-white p-2 pb-1">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                return setSearchValue(e.target.value);
              }}
              placeholder="جستجو..."
              className="!text-[13px] font-iranYekan focus:border-primary bg-transparent w-full rounded border border-gray-200 px-2 py-2 text-sm focus:outline-none"
              dir="rtl"
            />
          </div>
          <ul
            className="overflow-auto rounded-md p-1 text-right shadow-menu focus:outline-none"
            role="listbox"
            aria-labelledby="listbox-label"
            style={{ maxHeight: "150px" }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                return (
                  <li
                    key={option.value}
                    className="relative cursor-pointer select-none p-[6px]"
                    onClick={() => {
                      return handleOptionChange(option.value);
                    }}
                  >
                    <div className="flex items-center justify-start gap-2" dir="rtl">
                      <Checkbox
                        name="checkbox"
                        className="p-0"
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => {
                          return handleOptionChange(option.value);
                        }}
                      />
                      <Typography
                        placeholder=""
                        className="select_option__text truncate text-right text-primary_normal"
                        {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                      >
                        {option.label}
                      </Typography>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="font-iranYekan text-[13px] p-2 text-center text-sm text-gray-400">موردی یافت نشد</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
