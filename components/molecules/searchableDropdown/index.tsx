import React, { useRef, useState } from "react";
import InputAtom from "@components/atoms/input";
import { ChevronLeftIcon, SearchIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";

interface IProps {
  options?: { label: string; value: any }[];
  handleChange: (event: any) => void;
  background?: string;
}

const SearchableDropdown = ({ options, handleChange, background }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchVal = useRef("");

  const [selectedItem, setSelectedItem] = useState<
    { label: string; value: string | number }[] | undefined
  >([]);
  const [inputVal, setInputVal] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    handleChange(option.value);
    toggleDropdown();
    setInputVal(option.label);
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={`w-full relative inline-block`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div
          className={`w-full h-10 flex items-center bg-${background} border-2 border-normal rounded-lg px-2`}
        >
          <SearchIcon className="h-5 w-5 stroke-icon-hover" />
          <InputAtom
            onChange={(e) => {
              setInputVal(e.target.value);
              searchVal.current = e.target.value;
              const matchingUsers = options?.filter((user) =>
                user.label.includes(e.target.value),
              );
              setSelectedItem(matchingUsers);
              {
                inputVal !== "" && setIsOpen(true);
              }
            }}
            onClick={toggleDropdown}
            value={inputVal}
            className={`${background ? `bg-${background}` : "bg-white"} flex-grow !h-8 pr-0 outline-none !overflow-hidden border-none focus:border-none !w-auto`}
            type="text"
            placeholder="جست و جو کنید ..."
          />
          <ChevronLeftIcon
            className={`w-2 h-2 stroke-icon-hover transform transition-transform ${
              isOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-[99999] text-right overflow-auto focus:outline-none  shadow-menu mt-2 min-w-max w-full p-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
            {inputVal === "" ? (
              options?.length ? (
                <ul className="max-h-[200px]">
                  {options.map((option) => {
                    return (
                      <li
                        className="cursor-pointer select-none relative p-[6px]"
                        key={option.label}
                        onClick={() => {
                          handleSelect(option);
                        }}
                      >
                        <Typography className="select_option__text truncate text-right text-primary ">
                          {option.label}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Typography className="select_option__text truncate text-right text-primary ">
                  موردی یافت نشد.
                </Typography>
              )
            ) : selectedItem?.length ? (
              <ul className="max-h-[200px]">
                {selectedItem.map((option, index) => {
                  return (
                    <li
                      className="cursor-pointer select-none relative p-[6px]"
                      key={option.label}
                      onClick={() => handleSelect(option)}
                    >
                      <Typography className="select_option__text truncate text-right text-primary ">
                        {option.label}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Typography className="select_option__text truncate text-right text-primary ">
                موردی یافت نشد.
              </Typography>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchableDropdown;
