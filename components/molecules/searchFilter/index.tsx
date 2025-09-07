import React, { useState } from "react";
import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import SearchContent from "@components/molecules/searchContent";
import { usePathname } from "next/navigation";
import { useFilterStore } from "@store/filter";
import { useCategoryStore } from "@store/category";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({ open, setOpen }: IProps) => {
  const currentPath = usePathname();
  const [getFilterChildren, setFilterChildren] = [
    useFilterStore((state) => {
      return state.filterChildren;
    }),
    useFilterStore((state) => {
      return state.setFilterChildren;
    }),
  ];
  const [getFilterReport, setFilterReport] = [
    useFilterStore((state) => {
      return state.filterReport;
    }),
    useFilterStore((state) => {
      return state.setFilterReport;
    }),
  ];
  const { categorySearchContentLink } = useCategoryStore();

  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <div className="flex gap-x-2">
      {currentPath === "/admin/sharedDocuments" || currentPath === "/admin/myDocuments" ? null : (
        <Button
          onClick={() => {
            setOpenSearchModal(true);
          }}
          className="searchContent flex items-center justify-center rounded-lg border-2 border-gray-100 bg-white p-1 shadow-none"
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
        className="advancedFilter bg-whiteShadow-none flex items-center justify-center rounded-lg border-2 border-gray-100 p-1"
      >
        <FilterIcon className="h-5 w-5 stroke-gray-500" />
      </Button>
      {openSearchModal && !categorySearchContentLink && <SearchContent setOpen={setOpenSearchModal} />}
    </div>
  );
};

export default SearchFilter;
