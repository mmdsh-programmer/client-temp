import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import React, { useState } from "react";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";

import { Button } from "@material-tailwind/react";
import SearchContent from "@components/molecules/searchContent";
import { useSetRecoilState } from "recoil";
import { usePathname } from "next/navigation";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({ open, setOpen }: IProps) => {
  const currentPath = usePathname();
  const setFilterChildren = useSetRecoilState(filterChildrenAtom);
  const setFilterReport = useSetRecoilState(filterReportAtom);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <>
      <div className="flex gap-x-2">
        {currentPath === "/admin/sharedDocuments" ||
        currentPath === "/admin/myDocuments" ? null : (
          <Button
            onClick={() => {
              setOpenSearchModal(true);
            }}
            placeholder=""
            className="categorySearchContent bg-white shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
          >
            <SearchIcon className="h-5 w-5 stroke-gray-500" />
          </Button>
        )}
        <Button
          onClick={() => {
            setOpen(!open);
            if (open) {
              setFilterChildren(null);
              setFilterReport(null);
            }
          }}
          placeholder=""
          className="categorySearch bg-whiteShadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
        >
          <FilterIcon className="h-5 w-5 stroke-gray-500" />
        </Button>
      </div>
      {openSearchModal && <SearchContent setOpen={setOpenSearchModal} />}
    </>
  );
};

export default SearchFilter;
