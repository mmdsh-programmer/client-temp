"use client";

import React, { useEffect } from "react";
import DomainConfig from "@components/organisms/domain";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";

const DomainManagementPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionModalListAtom);
  const setSidebarSection = useSetRecoilState(sidebarSectionAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
    setSidebarSection(ESidebarSection.DOMAIN_MANAGEMENT);
  }, []);

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden">
      <div className="category-header flex items-center justify-between px-4 xs:px-0">
        <Typography className="title_t1 text-primary_normal">مدیریت دامنه</Typography>
      </div>
      <div className="h-[calc(100%-50px)] rounded-lg bg-white shadow-small">
        <DomainConfig />
      </div>
    </div>
  );
};

export default DomainManagementPage;
