import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import { IVersion, IVersionView } from "@interface/version.interface";
import { Spinner, Typography } from "@material-tailwind/react";
import { editorDataAtom, editorModalAtom, editorModeAtom } from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { EDocumentTypes } from "@interface/enums";
import EmptyList from "@components/molecules/emptyList";
import { LastVersionIcon } from "@components/atoms/icons";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import VersionMenu from "@components/molecules/versionMenu";
import { selectedDocumentAtom } from "@atom/document";

const VersionTableView = ({
  isLoading,
  getVersionList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  lastVersion,
  type,
}: IVersionView) => {
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const setSelectedVersion = useSetRecoilState(selectedVersionAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);

  const listLength = getVersionList?.[0].length;

  const handleOpenEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    setSelectedVersion(value);
    setEditorData(null);
    setEditorMode("preview");
    setEditorModal(true);
    setVersionModalList(false);
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
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          <Spinner className="h-8 w-8" color="purple" />
        </div>
      ) : listLength ? (
        <div className="version-list-table w-full overflow-auto border-[0.5px] border-normal rounded-lg h-[calc(100vh-200px)]">
          <table className="w-full overflow-hidden min-w-max ">
            <TableHead
              tableHead={[
                { key: "name", value: "نام نسخه" },
                {
                  key: "creator",
                  value: "ایجاد کننده",
                  className: "hidden md:table-cell",
                },
                { key: "createDate", value: "تاریخ ایجاد" },
                {
                  key: "editDate",
                  value: "تاریخ ویرایش",
                  className: "hidden xl:table-cell",
                },
                { key: "status", value: "وضعیت", className: "version-status" },
                {
                  key: "action",
                  value: "عملیات",
                  className: "version-action flex !justify-end ml-4 ",
                },
              ]}
            />
            <tbody>
              {getVersionList.map((list) => {
                return list.map((version) => {
                  return (
                    <TableCell
                      key={`version-table-item-${version.id}`}
                      className="version-table-item"
                      onClick={() => {
                        if (
                          getSelectedDocument?.contentType !==
                          EDocumentTypes.board
                        ) {
                          handleOpenEditor(version);
                        } else {
                          handleOpenBoardEditor(version);
                        }
                      }}
                      tableCell={[
                        {
                          data: version.versionNumber,
                          className: "max-w-[200px] truncate",
                        },
                        {
                          data: version.creator?.name,
                          className: "hidden md:table-cell",
                        },
                        {
                          data: FaDateFromTimestamp(
                            +new Date(version.createDate)
                          ),
                        },
                        {
                          data: version.updateDate
                            ? FaDateFromTimestamp(+new Date(version.updateDate))
                            : "_",
                          className: "hidden xl:table-cell",
                        },
                        {
                          data: (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex flex-wrap gap-1">
                                <div
                                  className={`${
                                    translateVersionStatus(
                                      version.status,
                                      version.state
                                    ).className
                                  }`}
                                >
                                  {
                                    translateVersionStatus(
                                      version.status,
                                      version.state
                                    ).translated
                                  }
                                </div>
                                <RenderIf
                                  isTrue={version.status === "accepted"}
                                >
                                  <Typography className="label text-info bg-blue-50 flex items-center justify-center h-6 !px-2 rounded-full">
                                    عمومی
                                  </Typography>
                                </RenderIf>
                              </div>
                              <RenderIf
                                isTrue={
                                  version.state === "version" &&
                                  lastVersion?.id === version.id &&
                                  (version.status === "private" ||
                                    version.status === "accepted")
                                }
                              >
                                <>
                                  <LastVersionIcon className="h-5 w-5 fill-green-400" />
                                  <Typography className="label text-green-400">
                                    آخرین نسخه
                                  </Typography>
                                </>
                              </RenderIf>
                            </div>
                          ),
                        },
                        {
                          data: (
                            <VersionMenu
                              version={version}
                              lastVersion={lastVersion}
                            />
                          ),
                          stopPropagation: true,
                          className: "justify-end",
                        },
                      ]}
                      active={!!version.newOne}
                    />
                  );
                });
              })}
              <RenderIf isTrue={!!hasNextPage}>
                <tr>
                  <td colSpan={6} className="!text-center py-4">
                    <div className="flex justify-center items-center">
                      <LoadMore
                        className="self-center !shadow-none underline text-[10px] text-primary_normal !font-normal"
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                      />
                    </div>
                  </td>
                </tr>
              </RenderIf>
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </>
  );
};

export default VersionTableView;
