import React from "react";
import RenderIf from "@components/renderIf";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import { Card, Spinner } from "@material-tailwind/react";
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
import RepoCardBody from "@components/molecules/repoCardBody";
import ImageComponent from "@components/atoms/image";
import Text from "@components/atoms/typograghy/text";

const BookmarkRepoList = () => {
  const mode = useRecoilValue(listMode);
  const {
    data: getBookmarkRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetBookmarkList(10);

  const listLength = getBookmarkRepoList?.pages[0].total;

  return (
    <div className="xs:p-4 bg-transparent w-full shadow-none">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="purple" />
        </div>
      ) : listLength ? (
        <>
          <RenderIf isTrue={mode === EListMode.table}>
            <>
              <Card
                placeholder=""
                className="hidden xs:flex flex-col w-full rounded-lg h-full overflow-auto shadow-none"
              >
                <div className="border-[0.5px] border-normal rounded-lg shadow-none">
                  <table className=" w-full min-w-max overflow-x-hidden ">
                    <TableHead
                      tableHead={[
                        {
                          key: "name",
                          value: "نام مخزن",
                          isSorted: true,
                          className: "",
                        },
                        {
                          key: "createDate",
                          value: "تاریخ ایجاد",
                          isSorted: true,
                          className: "",
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
                              navigateTo={`/admin/repositories?repoId=${repo.id}`}
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
              </Card>
              <div className="flex flex-wrap gap-y-4 xs:hidden">
                {getBookmarkRepoList?.pages.map((page) => {
                  return page.list.map((repo) => {
                    return (
                      <div
                        key={`repo-table-moblie-item-${repo.id}`}
                        className="px-2 bg-white w-full border-2 border-gray-200 rounded-md shadow-none"
                      >
                        <div className="p-0">
                          <RepoCardBody
                            icon={
                              repo.imageFileHash ? (
                                <ImageComponent
                                  className="object-cover"
                                  src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repo.imageFileHash}`}
                                  alt="repo-image"
                                />
                              ) : null
                            }
                            title={repo.name}
                          >
                            <RepoMenu repo={repo} />
                          </RepoCardBody>
                        </div>
                        <div className="flex px-3 justify-between pt-1 pb-4">
                          <Text
                            className="font-iranYekan text-placeholder text-xs"
                          >
                            تاریخ ایجاد
                          </Text>
                          <Text
                            className="font-iranYekan text-xs text-primary"
                          >
                            {FaDateFromTimestamp(+new Date(repo.createDate))}
                          </Text>
                        </div>
                      </div>
                    );
                  });
                })}
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
            <Card
              placeholder=""
              className="overflow-auto bg-transparent xs:bg-inherit shadow-none"
            >
              <div className=" flex gap-4 flex-wrap min-w-full">
                {getBookmarkRepoList?.pages.map((page) => {
                  return page.list.map((repo) => {
                    return (
                      <Card
                        placeholder=""
                        key={`repo-card-item-${repo.id}`}
                        className="flex flex-col flex-grow flex-shrink max-w-full w-full  xs:w-[250px] md:w-[300px] lg:w-[300px]  rounded-lg bg-white border-2 border-gray-200 shadow-none"
                      >
                        <RepoCardMode repo={repo} />
                      </Card>
                    );
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
            </Card>
          </RenderIf>
        </>
      ) : (
        <EmptyList
          type={EEmptyList.BOOKMARK_REPO}
        />
      )}
    </div>
  );
};

export default BookmarkRepoList;
