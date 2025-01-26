import React, { useEffect, useState } from "react";
import { DocIcon } from "@components/atoms/icons";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import useGetDocument from "@hooks/document/useGetDocument";
import { useSetRecoilState } from "recoil";
import { categorySearchContentAtom } from "@atom/category";
import { useRouter } from "next/navigation";

interface IProps {
  data: IContentSearchListItem;
  onClick?: () => void;
}

export const ResultItem = ({ data, onClick }: IProps) => {
  const router = useRouter();
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const setOpen = useSetRecoilState(categorySearchContentAtom);
  const {
    data: documentInfo,
    isSuccess,
    isError,
  } = useGetDocument(data.repoId, data.documentId, isEnabled);

  const handleDocumentSelect = () => {
    setEnabled(true);
    onClick?.();
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      const redirectLink = `${window.location.origin}${window.location.pathname}?repoId=${data.repoId}&categoryId=${documentInfo?.categoryId}&documentId=${data.documentId}`;
      router.push(redirectLink);
      setEnabled(false);
    }
    if (isError) {
      setOpen(false);
    }
  });

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
