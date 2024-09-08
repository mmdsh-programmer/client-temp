import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { filterChildren, filterReport } from "@atom/filter";
import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import SearchContent from "@components/molecules/searchContent";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({ open, setOpen }: IProps) => {
  const setFilterChildren = useSetRecoilState(filterChildren);
  const setFilterReport = useSetRecoilState(filterReport);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <>
      <div className="flex gap-x-2">
        <Button
          onClick={() => {
            setOpenSearchModal(true);
          }}
          placeholder=""
          className="bg-white search-container  shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
        >
          <SearchIcon className="h-5 w-5 stroke-gray-500" />
        </Button>
        <Button
          onClick={() => {
            setOpen(!open);
            if (open) {
              setFilterChildren(null);
              setFilterReport(null);
            }
          }}
          placeholder=""
          className="bg-white search-container shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
        >
          <FilterIcon className="h-5 w-5 stroke-gray-500" />
        </Button>
      </div>
      {openSearchModal && <SearchContent setOpen={setOpenSearchModal} />}
    </>
  );
};

export default SearchFilter;
