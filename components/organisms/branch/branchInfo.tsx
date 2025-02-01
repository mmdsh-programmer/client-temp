import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

const BranchInfo = () => {
  return (
    <div className=" flex flex-col h-full bg-white rounded-lg shadow-small">
        <EmptyList type={EEmptyList.BRANCHINFO} />
    </div>
  );
};

export default BranchInfo;
