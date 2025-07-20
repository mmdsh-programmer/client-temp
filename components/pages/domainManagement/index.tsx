"use client";

import React, { useEffect } from "react";
import DomainConfig from "@components/organisms/domain";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";

const DomainManagementPage = () => {
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
      <div className="domain-header flex items-center justify-between px-4 pt-4 xs:p-0" >
        <Typography className="title_t1 text-primary_normal">مدیریت دامنه</Typography>
      </div>
      <div className="h-[calc(100%-50px)] rounded-lg bg-white shadow-small">
        <DomainConfig />
      </div>
    </div>
  );
};

export default DomainManagementPage;
