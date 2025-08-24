import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import { IVersion, IVersionView } from "@interface/version.interface";
import { Typography } from "@material-tailwind/react";
import { EDocumentTypes } from "@interface/enums";
import EmptyList from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import MobileCard from "@components/molecules/mobileCard";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import VersionMenu from "@components/molecules/versionMenu";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";

const VersionMobileView = ({
  isLoading,
  getVersionList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  lastVersion,
  type,
}: IVersionView) => {
  const getSelectedDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });
  const { versionModalList, setVersionModalList, setSelectedVersion } = useVersionStore();
  const { setEditorData, setEditorMode, setEditorModal } = useEditorStore();

  const listLength = getVersionList?.[0].length;

  const handleOpenEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    setEditorData(value);
    setEditorMode("preview");
    setVersionModalList(false);
    setEditorModal(true);
    setSelectedVersion(value);
  };

  const handleOpenBoardEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    window.open(`http://localhost:8080/board/${value.id}`);
  };

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : listLength ? (
        <div className="version-list-mobile flex h-[calc(100vh-140px)] flex-col gap-3 overflow-auto rounded-lg">
          {getVersionList.map((list) => {
            return list.map((version) => {
              return (
                <MobileCard
                  key={version.id}
                  name={
                    version.state === "version" &&
                    lastVersion?.id === version.id &&
                    (version.status === "private" || version.status === "accepted") ? (
                      <div className="flex items-center gap-1">
                        <Typography className="title_t2 text-primary_normal">
                          {version.versionNumber}
                        </Typography>
                        <Typography className="label text-green-400">آخرین نسخه</Typography>
                      </div>
                    ) : (
                      version.versionNumber
                    )
                  }
                  description={[
                    {
                      title: "تاریخ ایجاد",
                      value: FaDateFromTimestamp(+version.createDate) || "--",
                    },
                    {
                      title: "سازنده",
                      value: version.creator?.userName || "--",
                    },
                    {
                      title: "وضعیت",
                      value: translateVersionStatus(version.status, version.state).translated,
                      className: `${
                        translateVersionStatus(version.status, version.state).className
                      } version-status`,
                    },
                  ]}
                  onClick={() => {
                    if (getSelectedDocument?.contentType !== EDocumentTypes.board) {
                      handleOpenEditor(version);
                    } else {
                      handleOpenBoardEditor(version);
                    }
                  }}
                  cardAction={<VersionMenu version={version} lastVersion={lastVersion} />}
                  className={`version-mbile-item ${versionModalList ? "border-[1px] border-normal" : ""}`}
                />
              );
            });
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <LoadMore
              className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none"
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </RenderIf>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </>
  );
};

export default VersionMobileView;
