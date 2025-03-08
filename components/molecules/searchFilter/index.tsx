import React, { useState } from "react";
import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import SearchContent from "@components/molecules/searchContent";
import { usePathname } from "next/navigation";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { useRecoilState } from "recoil";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({ open, setOpen }: IProps) => {
  const currentPath = usePathname();
  const [getFilterChildren, setFilterChildren] =
    useRecoilState(filterChildrenAtom);
  const [getFilterReport, setFilterReport] = useRecoilState(filterReportAtom);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <div className="flex gap-x-2">
      {currentPath === "/admin/sharedDocuments" ||
      currentPath === "/admin/myDocuments" ? null : (
        <Button
          onClick={() => {
            setOpenSearchModal(true);
          }}
          className="searchContent bg-white shadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
        >
          <SearchIcon className="h-5 w-5 stroke-gray-500" />
        </Button>
      )}
      <Button
        onClick={() => {
          if ((getFilterReport || getFilterChildren) && open) {
            setFilterChildren(null);
            setFilterReport(null);
            setOpen(false);
          } else {
            setOpen(!open);
          }
        }}
        placeholder=""
        className="advancedFilter bg-whiteShadow-none border-2 border-gray-100 rounded-lg flex justify-center items-center p-1"
      >
        <FilterIcon className="h-5 w-5 stroke-gray-500" />
      </Button>
      {openSearchModal && <SearchContent setOpen={setOpenSearchModal} />}
    </div>
  );
};

export default SearchFilter;
