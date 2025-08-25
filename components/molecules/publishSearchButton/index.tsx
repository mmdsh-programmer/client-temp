"use client";

import { IconButton } from "@material-tailwind/react";
import PublishSearchContent from "@components/organisms/dialogs/publish";
import React from "react";
import { SearchIcon } from "@components/atoms/icons";
import { usePublishStore } from "@store/publish";

const PublishSearchButton = () => {
  const {
    openPublishPageSearchContent: getOpenSearch,
    setOpenPublishPageSearchContent: setOpenSearch,
  } = usePublishStore();

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <IconButton className="bg-tertiary" variant="text" onClick={handleOpenSearch}>
        <SearchIcon className="h-5 w-5 stroke-white xs:h-7 xs:w-7" />
      </IconButton>

      {getOpenSearch ? <PublishSearchContent /> : null}
    </>
  );
};

export default PublishSearchButton;
