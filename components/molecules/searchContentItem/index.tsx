import React, { useState } from "react";

import { DocIcon } from "@components/atoms/icons";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import useGetDocument from "@hooks/document/useGetDocument";

interface IProps {
  data: IContentSearchListItem;
  onClick?: () => void;
}

export const ResultItem = ({
 data, onClick 
}: IProps) => {
  const [isEnabled, setEnabled] = useState<boolean>(false);
  useGetDocument(data.repoId, data.documentId, isEnabled, false);

  const handleDocumentSelect = () => {
    setEnabled(true);
    onClick?.();
  };

  return (
    <div
      title={`${data.repoName} > ${data.documentName}`}
      className="flex bg-gray-50 border-[1px] border-normal p-3 rounded-lg text-right cursor-pointer"
      onClick={handleDocumentSelect}
    >
      <DocIcon className="flex-none w-6 h-6 fill-info ml-2" />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {data.repoName}
        {" > "}
        {data.documentName}
      </span>
    </div>
  );
};
