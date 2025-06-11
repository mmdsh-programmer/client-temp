"use client";

import React, { useEffect } from "react";
import Branch from "@components/organisms/branch";
import BranchInfo from "@components/organisms/branch/branchInfo";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";

const BranchManagementPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionModalListAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
  }, []);

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="category-header flex items-center justify-between px-4 xs:px-0">
        <Typography className="title_t1 text-primary_normal">مدیریت شعبات</Typography>
      </div>
      <div className="flex h-[calc(100%-50px)] justify-evenly gap-2">
        <div className="h-full hidden xs:block w-[30%] max-w-[260px] basis-1/5">
          <Branch />
        </div>
        <div className="w-full xs:basis-4/5 overflow-x-auto">
          <BranchInfo />
        </div>
      </div>
    </div>
  );
};

export default BranchManagementPage;
