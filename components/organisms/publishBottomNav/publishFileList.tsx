"use client";

import React from "react";
import { DownloadIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";
import { IVersion } from "@interface/version.interface";
import useGetPublishAttachment from "@hooks/files/useGetPublishAttachment";
import { Spinner } from "@components/atoms/spinner";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";

interface IProps {
  version: IVersion;
}

const PublishFileList = ({ version }: IProps) => {
  const {
    data: documentAttachment,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPublishAttachment(version.documentId, 20);

  const renderContent = () => {
    if (documentAttachment?.pages[0].total) {
      return documentAttachment.pages.map((page) => {
        return page.list.map((file) => {
          const fileSizeInKB = file.size / 1000;
          const fileSizeInMB = fileSizeInKB / 1000;
          return (
            <div className="flex max-w-[80%] flex-grow flex-col items-start" key={file.hash}>
              <Typography
                placeholder=""
                className="title_t2 max-w-full truncate text-primary_normal"
                title={file.name}
                dir="ltr"
                {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                {file.name}
              </Typography>
              <div className="flex items-center gap-1">
                <a
                  className="bg-transparent p-0"
                  download
                  href={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${file.hash}?&checkUserGroupAccess=true&time=${Date.now()}`}
                  onClick={(e) => {
                    return e.stopPropagation();
                  }}
                >
                  <DownloadIcon className="h-5 w-5 pt-1" />
                </a>
                <Typography
                  placeholder=""
                  className="title_t4 text-hint"
                  {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                >
                  {fileSizeInKB < 1000
                    ? `${fileSizeInKB.toFixed(2)} KB`
                    : `${fileSizeInMB?.toFixed(2)} MB`}
                </Typography>
              </div>
            </div>
          );
        });
      });
    }
    return <EmptyList type={EEmptyList.ATTACHMENT} />;
  };

  return (
    <>
      {isLoading ? <Spinner className="h-6 w-6" /> : renderContent()}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="flex items-center justify-center">
          <LoadMore
            className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none xl:bg-primary"
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </RenderIf>
    </>
  );
};

export default PublishFileList;
