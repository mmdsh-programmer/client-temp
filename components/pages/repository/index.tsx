"use client"

import CategoryBulk from "@components/molecules/categoryBulk";
import CategoryList from "@components/organisms/category";
import React from "react";
import RepoInfo from "@components/organisms/repoInfo";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import VersionList from "../version";
import { useRecoilValue } from "recoil";
import { versionListAtom } from "@atom/version";

const RepoPage = () => {
  const getShowVersionList = useRecoilValue(versionListAtom);

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      {getShowVersionList ? (
        <VersionList />
      ) : (
        <>
          <RepoInfo />
          <CategoryList />
        </>
      )}
       {getBulkItems.length ? <CategoryBulk /> : <RepoTypesMobileView />}
    </div>
  );
};

export default RepoPage;
