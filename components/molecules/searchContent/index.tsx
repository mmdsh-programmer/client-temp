import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DialogBody } from "@material-tailwind/react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import InputAtom from "@components/atoms/input";
import SearchContentResult from "../searchContentResult";
import { SearchIcon } from "@components/atoms/icons";
import { categorySearchContentParamAtom } from "atom/category";
import { repoAtom } from "@atom/repository";
import useDebounce from "@hooks/custom/useDebounce";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContent = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getSearchParam, setSearchParam] = useRecoilState(categorySearchContentParamAtom);

  const [search, setSearch] = useState<string>(getSearchParam || "");
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
    setSearchParam(null);
  };

  return (
    <InfoDialog dialogHeader="جست و جو در محتوا" setOpen={handleClose}>
      <DialogBody placeholder="dialog body" className="flex-grow px-5 py-3 xs:p-6">
        <div className="ml-2 flex h-10 w-full max-w-full flex-grow items-center gap-2 rounded-lg border-[1px] border-normal bg-gray-50 px-3">
          <SearchIcon className="h-5 w-5 stroke-icon-hover" />
          <InputAtom
            type="text"
            className="!focus:border-none !w-auto overflow-hidden !border-none outline-none"
            placeholder={getSearchParam || "جست و جو در محتوا "}
            autoComplete="off"
            onKeyDown={(event) => {
              if (!search && event.code === "Space") {
                event.preventDefault();
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            defaultValue={getSearchParam || ""}
          />
        </div>
        {getRepo ? <SearchContentResult repoId={getRepo.id} /> : null}
      </DialogBody>
    </InfoDialog>
  );
};

export default SearchContent;
