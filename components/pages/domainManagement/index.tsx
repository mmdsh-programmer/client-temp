"use client";

import React, { useEffect } from "react";
import DomainConfig from "@components/organisms/domain";
import { Typography } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";

const DomainManagementPage = () => {
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
      <div className="domain-header flex items-center justify-between px-4 pt-4 xs:p-0">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="title_t1 text-primary_normal"
        >
          مدیریت دامنه
        </Typography>
      </div>
      <div className="h-[calc(100%-50px)] rounded-lg bg-white shadow-small">
        <DomainConfig />
      </div>
    </div>
  );
};

export default DomainManagementPage;
