import React from "react";
import RepoInfo from "@components/organisms/repoInfo";
import RepoMobileCards from "@components/organisms/repoMobileCards";
import { useRecoilValue } from "recoil";
import { bulkItems } from "@atom/bulk";
import CategoryList from "@components/organisms/category/categoryList";

const RepoPage = () => {
  const getBulkItems = useRecoilValue(bulkItems);
  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <RepoInfo />
      <CategoryList />
      <RepoMobileCards />
    </div>
  );
};

export default RepoPage;
