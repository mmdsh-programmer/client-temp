import React, { useEffect, useState } from "react";
import { DocIcon } from "@components/atoms/icons";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import useGetDocument from "@hooks/document/useGetDocument";
import { useSetRecoilState } from "recoil";
import { searchContentLinkAtom } from "@atom/category";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  data: IContentSearchListItem;
  onClick?: () => void;
}

export const ResultItem = ({ data, onClick }: IProps) => {
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const setLink = useSetRecoilState(searchContentLinkAtom);
  const {
    data: documentInfo,
    isError,
    isLoading,
    isSuccess,
  } = useGetDocument(data.repoId, data.documentId, isEnabled);

  const handleDocumentSelect = () => {
    setEnabled(true);
    const redirectLink = `${window.location.origin}${window.location.pathname}?repoId=${data.repoId}${documentInfo?.categoryId ? `&categoryId=${documentInfo?.categoryId}` : ""}&documentId=${data.documentId}`;
    setEnabled(false);
    onClick?.();
    setLink(redirectLink);
  };

  useEffect(() => {
    if (isError) {
      setLink(null);
      setEnabled(false);
    }
  }, [isError]);

  return (
    <div
      title={`${data.repoName} > ${data.documentName}`}
      className="flex cursor-pointer rounded-lg border-[1px] border-normal bg-gray-50 p-3 text-right"
      onClick={handleDocumentSelect}
    >
      {isLoading ? (
        <div className="flex w-fit flex-shrink-0 items-center justify-center">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
      ) : null}
      <DocIcon className="fill-info ml-2 h-6 w-6 flex-none" />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {data.repoName}
        {" > "}
        {data.documentName}
      </span>
    </div>
  );
};
