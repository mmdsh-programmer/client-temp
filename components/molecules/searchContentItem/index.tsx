import React, { useState } from "react";
import { DocIcon } from "@components/atoms/icons";
import useGetDocument from "@hooks/document/useGetDocument";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { categorySearchContent } from "atom/category";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { Button } from "@material-tailwind/react";

interface IProps {
  data: IContentSearchListItem;
  disabled?: boolean;
  onClick?: () => void;
}

export const ResultItem = ({ data, disabled, onClick }: IProps) => {
  const router = useRouter();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const setOpen = useSetRecoilState(categorySearchContent);
  useGetDocument(data.repoId, data.documentId, isEnabled);

  const handleDocumentSelect = () => {
    setEnabled(true);
    onClick?.();
  };

  return (
    <div
      title={`${data.repoName} > ${data.documentName}`}
      className="flex bg-gray-50 border-[1px] border-normal p-3 rounded-lg text-right"
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
