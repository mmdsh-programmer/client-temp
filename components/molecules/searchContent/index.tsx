import React, {
 useEffect,
 useState
} from "react";
import {
 useRecoilState, useRecoilValue 
} from "recoil";

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
  
  const [search, setSearch] = useState<string>("");
  const [getSearchParam, setSearchParam] = useRecoilState(
    categorySearchContentParamAtom,
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

  return (
    <InfoDialog dialogHeader="جست و جو در محتوا" setOpen={handleClose}>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="flex flex-grow gap-2 w-full max-w-full ml-2 items-center h-10 px-3 border-[1px] border-normal bg-gray-50 rounded-lg ">
          <SearchIcon className="w-5 h-5 stroke-icon-hover" />
          <InputAtom
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
        {getRepo ? <SearchContentResult repoId={getRepo.id}/> : null}
      </DialogBody>
    </InfoDialog>
  );
};

export default SearchContent;
