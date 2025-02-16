import React from "react";
import SearchInput from "@components/molecules/searchInput";
import BranchUserList from "./branchUsersList";

const BranchUsers = () => {
  return (
    <div className="flex flex-col h-full pb-5 px-5">
      <div className="h-[76px] min-h-[76px] flex justify-between items-center">
        <SearchInput />
      </div>
      <BranchUserList />
    </div>
  );
};

export default BranchUsers;
