"use client";

import Branch from "@components/organisms/branch";
import BranchInfo from "@components/organisms/branch/branchInfo";
import React from "react";
import { Typography } from "@material-tailwind/react";

const BranchManagementPage = () => {
  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="category-header flex justify-between items-center px-4 xs:px-0">
        <Typography className="title_t1 text-primary_normal">
          مدیریت شعبات
        </Typography>
      </div>
      <div className="flex justify-evenly gap-2 h-[calc(100%-50px)]">
        <div className="basis-1/5 w-[30%] max-w-[260px] h-full">
          <Branch />
        </div>
        <div className="basis-4/5 overflow-x-auto">
          <BranchInfo />
        </div>
      </div>
    </div>
  );
};

export default BranchManagementPage;
