import React, { useEffect, useState } from "react";

import AdvancedFilter from "@components/molecules/advancedFilter";
import InfoDialog from "@components/templates/dialog/infoDialog";
import SearchFilter from "@components/molecules/searchFilter";

const FilterMobileView = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className="flex xs:!hidden">
      <SearchFilter open={openFilter} setOpen={setOpenFilter} />
      {openFilter && isMobile ? (
        <InfoDialog
          dialogHeader="جستجوی پیشرفته"
          setOpen={() => {
            setOpenFilter(false);
          }}
          className="flex xs:!hidden"
        >
          <AdvancedFilter setOpen={setOpenFilter}  />
          </InfoDialog>
      ) : null}
    </div>
  );
};

export default FilterMobileView;
