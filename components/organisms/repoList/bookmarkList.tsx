import React from "react";
import RenderIf from "@components/renderIf";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { Spinner } from "@material-tailwind/react";
import { EListMode } from "@interface/enums";
import { useRecoilValue } from "recoil";
import { listMode } from "@atom/app";
import TableHead from "@components/molecules/tableHead";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RepoCardMode from "@components/molecules/repoCardMode";
import TableCell from "@components/molecules/tableCell";
import { FaDateFromTimestamp } from "@utils/index";
import RepoMenu from "@components/molecules/repoMenu";
import MobileCard from "@components/molecules/mobileCard";

const BookmarkRepoList = () => {
  const mode = useRecoilValue(listMode);
  const {
    data: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetBookmarkList(10, undefined, true);

  const listLength = getBookmarkRepoList?.pages[0].total;

  return (
    <>
    <RenderIf isTrue={mode === EListMode.table}>
      <>
        <div className="hidden xs:block">
          <div
            className={`p-5 flex flex-col bg-primary min-h-[calc(100vh-340px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small`}
          >
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner className="h-8 w-8" color="deep-purple" />
              </div>
            ) : listLength ? (
              <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
                <table className="w-full min-w-max ">
                  <TableHead
                    tableHead={[
                      {
                        key: "name",
                        value: "نام مخزن",
                        isSorted: true,
                      },
                      {
                        key: "createDate",
                        value: "تاریخ ایجاد",
                        isSorted: true,
                      },
                      {
                        key: "action",
                        value: "عملیات",
                        className: "flex justify-end ml-4 ",
                      },
                    ]}
                  />
                  <tbody>
                    {getBookmarkRepoList?.pages.map((page) => {
                      return page.list.map((repo) => {
                        return (
                          <TableCell
                            key={`repo-table-item-${repo.id}`}
                            navigateTo={
                              repo.isArchived
                                ? undefined
                                : `/admin/repositories?repoId=${repo.id}`
                            }
                            tableCell={[
                              { data: repo.name },
                              {
                                data: FaDateFromTimestamp(
                                  +new Date(repo.createDate)
                                ),
                              },
                              {
                                data: (
                                  <RepoMenu repo={repo} />
                                ),
                              },
                            ]}
                          />
                        );
                      });
                    })}
                    <RenderIf isTrue={!!hasNextPage}>
                      <tr>
                        <td colSpan={3} className="!text-center">
                          <LoadMore
                            className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                            isFetchingNextPage={isFetchingNextPage}
                            fetchNextPage={fetchNextPage}
                          />
                        </td>
                      </tr>
                    </RenderIf>
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyList
                type={EEmptyList.BOOKMARK_REPO}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col h-full min-h-[calc(100vh-340px)] xs:hidden gap-y-4 ">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner className="h-8 w-8" color="deep-purple" />
            </div>
          ) : listLength ? (
            getBookmarkRepoList?.pages.map((page) => {
              return page.list.map((repo) => {
                return (
                  <MobileCard
                    key={repo.id}
                    name={repo.name}
                    createDate={
                      repo.createDate
                        ? FaDateFromTimestamp(+new Date(repo.createDate))
                        : "--"
                    }
                    creator={repo.owner?.userName}
                    cardAction={<RepoMenu repo={repo} isList={true} />}
                  />
                );
              });
            })
          ) : (
            <EmptyList
              type={EEmptyList.BOOKMARK_REPO}
            />
          )}
          <RenderIf isTrue={!!hasNextPage}>
            <div className="m-auto">
              <LoadMore
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </div>
          </RenderIf>
        </div>
      </>
    </RenderIf>
    <RenderIf isTrue={mode === EListMode.card}>
      <div className="min-h-[calc(100vh-340px)]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="h-8 w-8" color="deep-purple" />
          </div>
        ) : listLength ? (
          <>
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-wrap">
              {getBookmarkRepoList?.pages.map((page) => {
                return page.list.map((repo) => {
                  return <RepoCardMode key={repo.id} repo={repo} />;
                });
              })}
            </div>
            <RenderIf isTrue={!!hasNextPage}>
              <div className="m-auto">
                <LoadMore
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                />
              </div>
            </RenderIf>
          </>
        ) : (
          <EmptyList
            type={EEmptyList.BOOKMARK_REPO}
          />
        )}
      </div>
    </RenderIf>
  </>
  )
};

export default BookmarkRepoList;
