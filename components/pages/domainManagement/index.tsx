"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import DomainConfig from "@components/organisms/domain";

const DomainManagementPage = () => {
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="category-header flex justify-between items-center px-4 xs:px-0">
        <Typography className="title_t1 text-primary">مدیریت دامنه</Typography>
      </div>
      <div className="h-[calc(100%-50px)] bg-white rounded-lg shadow-small">
        <DomainConfig />
      </div>
    </div>
  );
};

export default DomainManagementPage;
