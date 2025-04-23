"use client";

import { IconButton } from "@material-tailwind/react";
import PublishSearchContent from "@components/organisms/dialogs/publish";
import React from "react";
import { SearchIcon } from "@components/atoms/icons";
import { openPublishPageSearchContent } from "@atom/publish";
import { useRecoilState } from "recoil";

const PublishSearchButton = () => {
  const [getOpenSearch, setOpenSearch] = useRecoilState(
    openPublishPageSearchContent
  );

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <IconButton className="bg-tertiary" variant="text" onClick={handleOpenSearch}>
        <SearchIcon className="stroke-white w-5 h-5 xs:w-7 xs:h-7" />
      </IconButton>

      {getOpenSearch ? <PublishSearchContent /> : null}
    </>
  );
};

export default PublishSearchButton;
