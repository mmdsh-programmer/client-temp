"use client";

import React, { useState } from "react";

import { FeedIcon } from "@components/atoms/icons";
import FeedsDialog from "@components/organisms/dialogs/feeds";
import { IconButton } from "@material-tailwind/react";

const PublicFeedsButton = () => {
  const [openFeedsDialog, setOpenFeedsDialog] = useState(false);
  const toggleFeedsDialog = () => {
    setOpenFeedsDialog(!openFeedsDialog);
  };

  return (
    <>
      <IconButton className="bg-tertiary" onClick={toggleFeedsDialog}>
        <FeedIcon className="stroke-white w-5 h-5 xs:w-6 xs:h-6" />
      </IconButton>

      {openFeedsDialog ? <FeedsDialog setOpen={toggleFeedsDialog} /> : null}
    </>
  );
};

export default PublicFeedsButton;
