"use client";

import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import RepoCards from "@components/organisms/repoTypesCards";
import RepoList from "@components/organisms/repoList";
import RepoMobileCards from "@components/organisms/repoMobileCards";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoCreateDialogStepper from "@components/organisms/dialogs/repository/repoCreateDialogStepper";

const DashboardPage = () => {
  const setRepo = useSetRecoilState(repoAtom);
  const [openCreateRepo, setOpenCreateRepo] = useState(false);

  useEffect(() => {
    setRepo(null);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-4 xs:p-0 h-full flex flex-col gap-4 xs:gap-6 ">
        <RepoCards />
        <HeaderListTemplate
          header="مخزن‌ها"
          buttonText="ایجاد مخزن جدید"
          onClick={() => setOpenCreateRepo(true)}
        />
        <RepoList />
      </div>
      <RepoMobileCards />
      {openCreateRepo && (
        <RepoCreateDialogStepper setOpen={setOpenCreateRepo} />
      )}
    </div>
  );
};
export default DashboardPage;
