import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";

interface IProps {
  options?: { label: string; value: any; className?: string }[];
  selectedOption?: string | null;
  setSelectedOption: (options: string | any) => void;
  defaultOption?: string;
  className?: string;
}

const SelectAtom = ({
  options,
  selectedOption,
  setSelectedOption,
  defaultOption,
  className,
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
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={` relative inline-block`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <button
        onClick={toggleDropdown}
        className={`${className || ""}
        flex items-center leading-[18.2px] -tracking-[0.13px]
         truncate text-[13px] text-primary font-iranYekan font-normal gap-x-2
        bg-transparent  rounded-md focus:outline-none`}
      >
        {selectedOption
          ? options?.find((option) => option.value === selectedOption)?.label
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
            {options?.map((option) => (
              <li
                title={option.label}
                key={option.value}
                className="cursor-pointer select-none relative p-[6px]"
                onClick={() => {
                  handleOptionChange(option.value);
                }}
              >
                <Typography
                  className={`${option.className || ""} select_option__text truncate text-right text-primary`}
                >
                  {option.label}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectAtom;
