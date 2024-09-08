import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import RepoCards from "@components/organisms/repoTypesCards";
import RepoList from "@components/organisms/repoList";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";

const DashboardPage = () => {
  const setRepo = useSetRecoilState(repoAtom);

  useEffect(() => {
    setRepo(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 ">
      <RepoCards />
      <RepoList />
      <RepoTypesMobileView />
    </div>
  );
};
export default DashboardPage;
