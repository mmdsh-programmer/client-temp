"use client";

import React from "react";
import RepoInfo from "@components/organisms/repoInfo";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import { useRecoilValue } from "recoil";
import { bulkItems } from "@atom/bulk";
import CategoryList from "@components/organisms/category";
import { versionListAtom } from "@atom/version";
import VersionList from "../version";
import CategoryBulk from "@components/molecules/categoryBulk";

const RepoPage = () => {
  const getShowVersionList = useRecoilValue(versionListAtom);
  const getBulkItems = useRecoilValue(bulkItems);

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
