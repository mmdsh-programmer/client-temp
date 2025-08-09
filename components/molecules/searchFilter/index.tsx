import React, { useState } from "react";
import { FilterIcon, SearchIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import SearchContent from "@components/molecules/searchContent";
import { usePathname, useRouter } from "next/navigation";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchContentLinkAtom } from "@atom/category";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilter = ({ open, setOpen }: IProps) => {
  const currentPath = usePathname();
  const router = useRouter();

  const [getFilterChildren, setFilterChildren] = useRecoilState(filterChildrenAtom);
  const [getFilterReport, setFilterReport] = useRecoilState(filterReportAtom);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const getContentSearchLink = useRecoilValue(searchContentLinkAtom);

  const renderContent = () => {
    if (getContentSearchLink) {
      router.push(getContentSearchLink);
      return null;
    }
    if (openSearchModal) {
      return <SearchContent setOpen={setOpenSearchModal} />;
    }
  };

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
      {renderContent()}
    </div>
  );
};

export default SearchFilter;
