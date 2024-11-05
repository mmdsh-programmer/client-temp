"use client";

import React from "react";
import { openPublishPageSearchContent } from "@atom/publish";
import { SearchIcon } from "@components/atoms/icons";
import PublishSearchContent from "@components/organisms/dialogs/publish";
import { IconButton } from "@material-tailwind/react";
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
      <IconButton variant="text" onClick={handleOpenSearch}>
        <SearchIcon className="stroke-blue-gray-700 w-5 h-5 xs:w-7 xs:h-7" />
      </IconButton>

      {getOpenSearch ? <PublishSearchContent /> : null}
    </>
  );
};

export default PublishSearchButton;
