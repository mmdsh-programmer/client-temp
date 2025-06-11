import React from "react";
import SearchInput from "@components/molecules/searchInput";
import BranchUserList from "./branchUsersList";
import BranchUsersMobileView from "./branchUserMobileView";

const BranchUsers = () => {
  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex h-[76px] min-h-[76px] items-center justify-between">
        <SearchInput />
      </div>
      <div className="hidden h-full xs:block">
        <BranchUserList />
      </div>
      <div className="block h-full xs:hidden">
        <BranchUsersMobileView />
      </div>
    </div>
  );
};

export default BranchUsers;
