import React from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import TableHead from "@components/molecules/tableHead";
import EmptyList from "@components/molecules/emptyList";
import TableCell from "@components/molecules/tableCell";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import { IVersionView } from "@components/pages/version";
import VersionMenu from "@components/molecules/versionMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { LastVersionIcon } from "@components/atoms/icons";

const VersionTableView = ({
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
    <div
      className={`p-5 flex flex-col bg-primary min-h-[calc(100vh-200px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small`}
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
                },
                {
                  key: "createDate",
                  value: "تاریخ ایجاد",
                },
                { key: "editDate", value: "تاریخ ویرایش" },
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
                      tableCell={[
                        { data: version.versionNumber },
                        { data: version.creator?.name },
                        {
                          data: FaDateFromTimestamp(
                            +new Date(version.createDate),
                          ),
                        },
                        {
                          data: FaDateFromTimestamp(
                            +new Date(version.updateDate),
                          ),
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
                                  <div className="label text-info bg-blue-50 flex items-center justify-center h-6 !px-2 rounded-full">
                                    عمومی
                                  </div>
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
