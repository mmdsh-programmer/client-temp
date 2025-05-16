"use client";

import React from "react";
import { bulkItemsAtom } from "atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import { useRecoilValue } from "recoil";
import RepoList from "@components/organisms/repoList";

const Repository = () => {
  const getBulkItems = useRecoilValue(bulkItemsAtom);

  return (
    <>
      <div className="repo-wrapper flex flex-col gap-4">
        <RepoList />
      </div>
      <div className="relative">
        {getBulkItems.length ? <CategoryBulk /> : null}
      </div>
    </>
  );
};

export default Repository;
