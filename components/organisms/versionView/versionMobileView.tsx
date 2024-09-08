import React from "react";
import { IVersionView } from "@components/pages/version";
import { Spinner } from "@material-tailwind/react";
import MobileCard from "@components/molecules/mobileCard";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import EmptyList from "@components/molecules/emptyList";
import VersionMenu from "@components/molecules/versionMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";

const VersionMobileView = ({
  isLoading,
  getVersionList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  lastVersion,
  type,
}: IVersionView) => {
  const listLength = getVersionList?.[0].length;

  return (
    <div className="px-0 xs:px-4 flex-grow flex-shrink-0">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <div className="flex flex-col gap-3">
          {getVersionList.map((list) => {
            return list.map((version) => {
              return (
                <MobileCard
                  key={version.id}
                  name={`${
                    version.state === "version" &&
                    lastVersion?.id === version.id &&
                    (version.status === "private" ||
                      version.status === "accepted")
                  ? `${version.versionNumber} (آخرین نسخه)` : version.versionNumber} `}
                  createDate={
                    version.createDate
                      ? FaDateFromTimestamp(version.createDate)
                      : "--"
                  }
                  status={translateVersionStatus(version.status, version.state)}
                  creator={version.creator?.userName}
                  cardAction={
                    <VersionMenu version={version} lastVersion={lastVersion} />
                  }
                />
              );
            });
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <LoadMore
              className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </RenderIf>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </div>
  );
};

export default VersionMobileView;
