import React, { useEffect, useRef, useState } from "react";
import { categorySearchContentParam } from "atom/category";
import { useRecoilState } from "recoil";
import { SearchIcon } from "@components/atoms/icons";
import useDebounce from "@hooks/custom/useDebounce";
import { DialogBody } from "@material-tailwind/react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import InputAtom from "@components/atoms/input";
import SearchContentResult from "../searchContentResult";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContent = ({ setOpen }: IProps) => {
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
    <InfoDialog dialogHeader="جست و جو در محتوا" setOpen={handleClose}>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div
        className="flex flex-grow gap-2 w-full max-w-full ml-2 items-center h-10 px-3 border-[1px] border-normal bg-gray-50 rounded-lg ">
          <SearchIcon className="w-5 h-5 stroke-icon-hover" />
          <InputAtom
            ref={inputRef}
            type="text"
            className=" outline-none overflow-hidden !border-none !focus:border-none !w-auto"
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
        <SearchContentResult />
      </DialogBody>
    </InfoDialog>
  );
};

export default SearchContent;
