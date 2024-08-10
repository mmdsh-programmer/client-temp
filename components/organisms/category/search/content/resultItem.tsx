import { DocIcon } from "@components/atoms/icons";
import useGetDocument from "@hooks/document/useGetDocument";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { categorySearchContent } from "atom/category";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

interface IProps {
  data: IContentSearchListItem;
  disabled?: boolean;
  onClick?: () => void;
}

export const ResultItem = ({ data, disabled, onClick }: IProps) => {
  const router = useRouter();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const setOpen = useSetRecoilState(categorySearchContent);
  useGetDocument(
    data.repoId,
    data.documentId,
    isEnabled,   
  );

  const handleDocumentSelect = () => {
    setEnabled(true);
    onClick?.();
  };

  return (
    <button
      title={`${data.repoName} > ${data.documentName}`}
      className="flex bg-neutral-content text-base-200 py-3 px-2 rounded-[4px] text-right"
      onClick={handleDocumentSelect}
      disabled={disabled}
    >
      <DocIcon className="flex-none w-6 h-6 fill-info ml-2" />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {data.repoName}
        {" > "}
        {data.documentName}
      </span>
    </button>
  );
};
