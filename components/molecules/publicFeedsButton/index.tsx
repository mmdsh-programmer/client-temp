import { FeedIcon } from "@components/atoms/icons";
import Link from "next/link";
import React from "react";

const PublicFeedsButton = () => {
  return (
    <Link className="feeds-button" href="/feeds">
      <FeedIcon className="stroke-blue-gray-700 w-5 h-5 xs:w-6 xs:h-6" />
    </Link>
  );
};

export default PublicFeedsButton;
