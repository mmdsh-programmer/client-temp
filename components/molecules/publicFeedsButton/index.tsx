"use client";

import React, { useState } from "react";
import { FeedIcon } from "@components/atoms/icons";
import FeedsDialog from "@components/organisms/dialogs/feeds";

const PublicFeedsButton = () => {
  const [openFeedsDialog, setOpenFeedsDialog] = useState(false);
  const toggleFeedsDialog = () => {
    setOpenFeedsDialog(!openFeedsDialog);
  };

  return (
    <>
      <button onClick={toggleFeedsDialog}>
        <FeedIcon className="stroke-blue-gray-700 w-5 h-5 xs:w-6 xs:h-6" />
      </button>

      {openFeedsDialog ? <FeedsDialog setOpen={toggleFeedsDialog} /> : null}
    </>
  );
};

export default PublicFeedsButton;
