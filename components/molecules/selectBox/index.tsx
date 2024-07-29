import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";

interface IProps {
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: (options: any[]) => void;
  defaultOption: string;
  className?: string;
}

const SelectBox = ({
  options,
  selectedOptions,
  setSelectedOptions,
  defaultOption,
  className,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions(
      selectedOptions.includes(option)
        ? selectedOptions.filter((selected) => selected !== option)
        : [...selectedOptions, option]
    );
  };

  return (
    <div className={`${className || ""} relative inline-block `}>
      <button
        onClick={toggleDropdown}
        className="w-full truncate text-[13px] font-iranYekan py-1 pl-1 pr-2 flex justify-between font-normal items-center text-left bg-white border-2 border-gray-300 rounded-md focus:outline-none"
      >
        <span className="max-w-full truncate">
          {selectedOptions.length > 0
            ? selectedOptions
                .map(
                  (selected) =>
                    options.find((option) => option.value === selected)?.label
                )
                .join(", ")
            : defaultOption}
        </span>
        <span className="float-left">
          <svg
            className={`w-3 h-3 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-[99999] mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul
            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="text-gray-900 cursor-pointer select-none relative py-2 px-2 font-iranYekan"
                onClick={() => handleOptionChange(option.value)}
              >
                <div className="flex items-center">
                  <Checkbox
                    placeholder="checkbox"
                    className=" p-0"
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleOptionChange(option.value)}
                    color="deep-purple"
                    crossOrigin=""
                  />
                  <span className="ml-3 block truncate">{option.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
