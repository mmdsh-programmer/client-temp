"use client";

import React from "react";
import SharedDocumentList from "@components/organisms/sharedDocumentList";
import { bulkItemsAtom } from "atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import { useRecoilValue } from "recoil";

const SharedDocuments = () => {
  const getBulkItems = useRecoilValue(bulkItemsAtom);

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <SharedDocumentList />
      <div className="relative">
        {getBulkItems.length ? <CategoryBulk /> : null}
      </div>
    </div>
  );
};

export default SharedDocuments;
