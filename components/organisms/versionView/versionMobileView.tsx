import React from "react";
import { Spinner } from "@material-tailwind/react";
import MobileCard from "@components/molecules/mobileCard";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import EmptyList from "@components/molecules/emptyList";
import VersionMenu from "@components/molecules/versionMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { versionModalListAtom } from "@atom/version";
import { IVersion, IVersionView } from "@interface/version.interface";
import {editorDataAtom,
  editorModalAtom,
  editorModeAtom,} from "@atom/editor";
import { selectedDocumentAtom } from "@atom/document";
import { EDocumentTypes } from "@interface/enums";

const VersionMobileView = ({
  isLoading,
  getVersionList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  lastVersion,
  type,
}: IVersionView) => {
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  // const setEditorModal = useSetRecoilState(editorModalAtom);
  const listLength = getVersionList?.[0].length;

  const handleOpenEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    setEditorData(value);
    setEditorMode("preview");
    setVersionModalList(false);
    // setEditorModal(true);
  };

  const handleOpenBoardEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    window.open(`http://localhost:8080/board/${value.id}`);
  };

  return (
    <div className="px-0 xs:px-4 flex-grow flex-shrink-0">
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <div
          className="flex flex-col gap-3 rounded-lg"
        >
          {getVersionList.map((list) => {
            return list.map((version) => {
              return (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  className=""
                  key={version.id}
                  onClick={() => {
                    if (
                      getSelectedDocument?.contentType !== EDocumentTypes.board
                    ) {
                      handleOpenEditor(version);
                    } else {
                      handleOpenBoardEditor(version);
                    }
                  }}
                >
                  <MobileCard
                    name={`${
                      version.state === "version" &&
                      lastVersion?.id === version.id &&
                      (version.status === "private" ||
                        version.status === "accepted")
                        ? `${version.versionNumber} (آخرین نسخه)`
                        : version.versionNumber
                    } `}
                    createDate={
                      version.createDate
                        ? FaDateFromTimestamp(version.createDate)
                        : "--"
                    }
                    status={translateVersionStatus(
                      version.status,
                      version.state
                    )}
                    creator={version.creator?.userName}
                    cardAction={
                      <VersionMenu
                        version={version}
                        lastVersion={lastVersion}
                      />
                    }
                    className={`${versionModalList ? "border-[1px] border-normal" : ""}`}
                  />
                </div>
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
