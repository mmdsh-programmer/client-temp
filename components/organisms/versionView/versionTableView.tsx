import React from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import TableHead from "@components/molecules/tableHead";
import EmptyList from "@components/molecules/emptyList";
import TableCell from "@components/molecules/tableCell";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import VersionMenu from "@components/molecules/versionMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { LastVersionIcon } from "@components/atoms/icons";
import { IVersionView } from "../version/versionList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { IVersion } from "@interface/version.interface";
import {
  editorDataAtom,
  editorModalAtom,
  editorModeAtom,
} from "@atom/editor";
import { EDocumentTypes } from "@interface/enums";
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
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const setSelectedVersion = useSetRecoilState(selectedVersionAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const listLength = getVersionList?.[0].length;

  const handleOpenEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    setEditorData(value);
    setEditorMode("preview");
    setVersionModalList(false);
    setEditorModal(true);
    setSelectedVersion(value)
  };

  const handleOpenBoardEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    window.open(`http://localhost:8080/board/${value.id}`);
  };

  return (
    <div
      className={`p-5 flex flex-col bg-primary min-h-[calc(100vh-200px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small ${versionModalList ? "border-[1px] border-normal" : ""}`}
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
          <table className="w-full overflow-hidden min-w-max ">
            <TableHead
              tableHead={[
                {
                  key: "name",
                  value: "نام نسخه",
                },
                {
                  key: "creator",
                  value: "ایجاد کننده",
                  className: "hidden md:table-cell",
                },
                {
                  key: "createDate",
                  value: "تاریخ ایجاد",
                },
                {
                  key: "editDate",
                  value: "تاریخ ویرایش",
                  className: "hidden xl:table-cell",
                },
                {
                  key: "status",
                  value: "وضعیت",
                },
                {
                  key: "action",
                  value: "عملیات",
                  className: "flex !justify-end ml-4 ",
                },
              ]}
            />
            <tbody>
              {getVersionList.map((list) => {
                return list.map((version) => {
                  return (
                    <TableCell
                      key={`version-table-item-${version.id}`}
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
                        { data: version.versionNumber },
                        {
                          data: version.creator?.name,
                          className: "hidden md:table-cell",
                        },
                        {
                          data: FaDateFromTimestamp(
                            +new Date(version.createDate),
                          ),
                        },
                        {
                          data: FaDateFromTimestamp(
                            +new Date(version.updateDate),
                          ),
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
                                      version.state,
                                    ).className
                                  }`}
                                >
                                  {
                                    translateVersionStatus(
                                      version.status,
                                      version.state,
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
                          className: "justify-end",
                        },
                      ]}
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
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </div>
  );
};

export default VersionTableView;
