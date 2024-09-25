"use client";

import React from "react";
import CategoryBulk from "@components/molecules/categoryBulk";
import CategoryList from "@components/organisms/category";
import RepoInfo from "@components/organisms/repoInfo";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import VersionList from "../version";
import { bulkItemsAtom } from "@atom/bulk";
import { useRecoilValue } from "recoil";
import { versionListAtom } from "@atom/version";

const RepoPage = () => {
  const getShowVersionList = useRecoilValue(versionListAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);
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
