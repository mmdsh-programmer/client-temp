import React, { useEffect, useRef, useState } from "react";
import { categorySearchContentParam } from "atom/category";
import { useRecoilState } from "recoil";
import { SearchIcon } from "@components/atoms/icons";
import useDebounce from "@hooks/custom/useDebounce";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import { SearchResult } from "./searchResult";
import BackButton from "@components/atoms/button/backButton";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContent = ({ setOpen }: IProps) => {
  const inputRef = useRef<any>();
  const [search, setSearch] = useState<string>("");
  const [getSearchParam, setSearchParam] = useRecoilState(
    categorySearchContentParam
  );
  const debouncedValue = useDebounce<string>(search, 1000);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      setSearchParam(search.replace(/^[ \t]+|[ \t]+$/gm, ""));
    } else if (!debouncedValue && !search) {
      setSearchParam(search.replace(/^[ \t]+|[ \t]+$/gm, ""));
    }
  }, [debouncedValue]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Dialog
      placeholder=""
      size="sm"
      open={true}
      handler={handleClose}
      className={`flex flex-col !rounded-none shrink-0 !h-full w-full max-w-full xs:!h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary xs:!rounded-lg`}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <div className="flex items-center">
          <Typography className="form__title">جست و جو در محتوا</Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody placeholder="dialog body" className="flex-grow px-5 py-3 xs:p-6rr">
        <div className="relative ">
          <span className="absolute inset-y-0 right-3 flex items-center">
            <SearchIcon className="w-4 h-4 fill-base-200" />
          </span>
          <input
            ref={inputRef}
            type="text"
            className="placeholder:font-iranYekan w-full py-[7px] pr-9 pl-2 bg-transparent rounded-[4px] focus:outline-none border-2 border-gray-300 font-yekan-regular font-normal text-[13px] text-primary placeholder:text-placeholder leading-3"
            placeholder="جست و جو در محتوا "
            autoComplete="off"
            onKeyDown={(event) => {
              if (!search && event.code === "Space") {
                event.preventDefault();
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            defaultValue={getSearchParam}
          />
        </div>

        <SearchResult />
      </DialogBody>
    </Dialog>
  );
};
