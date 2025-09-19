import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import { ChevronLeftIcon } from "@components/atoms/icons";

export interface IOption {
  label: string;
  value: string | number; // Assuming value can be either string or number
  className?: string;
}

interface IProps {
  options?: IOption[];
  selectedOption?: IOption;
  setSelectedOption: (option: IOption) => void; // Updated type here
  defaultOption?: IOption;
  className?: string;
  onMenuScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  isLoading?: boolean;
}

const SelectAtom = ({
  options,
  selectedOption,
  setSelectedOption,
  defaultOption,
  className,
  onMenuScroll,
  isLoading,
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

  const handleOptionChange = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <button
        onClick={toggleDropdown}
        className={`${className || ""}
        flex items-center leading-[18.2px] -tracking-[0.13px]
         truncate text-[13px] text-primary_normal font-iranYekan font-normal gap-x-2
        bg-transparent rounded-md focus:outline-none`}
      >
        {selectedOption?.label ?? defaultOption?.label}
        <ChevronLeftIcon
          className={`w-2 h-2 stroke-icon-active transform transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div
          className="absolute max-h-[150px] overflow-auto z-[99999] mt-2 min-w-max w-full p-[1px] rounded-md bg-white ring-1 ring-black ring-opacity-5"
          onScroll={onMenuScroll}
        >
          <ul
            className="rounded-md p-1 text-right shadow-menu overflow-auto focus:outline-none"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {options?.map((option) => {
              return (
                <li
                  title={option.label}
                  key={option.value}
                  className="cursor-pointer select-none relative p-[6px]"
                  onClick={() => {
                    return handleOptionChange(option);
                  }}
                >
                  <Typography
                    placeholder=""
                    className={`${option.className || ""} select_option__text truncate text-right text-primary_normal`}
                    {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                  >
                    {option.label}
                  </Typography>
                </li>
              );
            })}
          </ul>
          {isLoading && (
            <div className="flex justify-center p-2">
              <Spinner className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectAtom;
