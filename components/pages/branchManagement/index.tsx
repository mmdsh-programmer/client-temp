"use client";

import React, { useEffect } from "react";
import Branch from "@components/organisms/branch";
import BranchInfo from "@components/organisms/branch/branchInfo";
import { Typography } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";

const BranchManagementPage = () => {
  const { setRepo } = useRepositoryStore();
  const { setCategory, setCategoryShow } = useCategoryStore();
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setVersionModalList } = useVersionStore();

  useEffect(() => {
    setRepo(null);
    setCategory(null);
    setCategoryShow(null);
    setSelectedDocument(null);
    setDocumentShow(null);
    setVersionModalList(false);
  }, []);

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="category-header flex items-center justify-between px-4 xs:px-0">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="title_t1 text-primary_normal"
        >
          مدیریت شعبات
        </Typography>
      </div>
      <div className="flex h-[calc(100%-50px)] justify-evenly gap-2">
        <div className="hidden h-full w-[30%] max-w-[260px] basis-1/5 xs:block">
          <Branch />
        </div>
        <div className="w-full overflow-x-auto xs:basis-4/5">
          <BranchInfo />
        </div>
      </div>
    </div>
  );
};

export default BranchManagementPage;
