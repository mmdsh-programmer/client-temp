import React from "react";
import { Spinner } from "@material-tailwind/react";
import TableHead from "@components/molecules/tableHead";
import LoadMore from "@components/molecules/loadMore";
import EmptyList from "@components/molecules/emptyList";
import TableCell from "@components/molecules/tableCell";
import RepoMenu from "@components/molecules/repoMenu";
import { FaDateFromTimestamp } from "@utils/index";
import RenderIf from "@components/atoms/renderIf";
import { IRepoView } from "../repoList";

const TableView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
  type
}: IRepoView) => {

  const listLength = getRepoList?.pages[0].total;

  return (
    <div
      className={`p-5 flex flex-col bg-primary min-h-[calc(100vh-340px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small`}
    >
      {isLoading || isFetching ? (
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
              {getRepoList?.pages.map((page) => {
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
                          data: FaDateFromTimestamp(+new Date(repo.createDate)),
                        },
                        {
                          data: <RepoMenu repo={repo} />,
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
        <EmptyList type={type} />
      )}
    </div>
  );
};

export default TableView;
