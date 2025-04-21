import { FaDateFromTimestamp, translateRoles } from "@utils/index";

import EmptyList from "@components/molecules/emptyList";
import { IRepoView } from "@interface/repo.interface";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import RepoMenu from "@components/molecules/repoMenu";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";

const TableView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
  type,
}: IRepoView) => {
  const listLength = getRepoList?.pages[0].total;

  if (isLoading || isFetching) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="purple" />
      </div>
    );
  }

  if (listLength) {
    return (
      <div className="p-5 flex flex-col bg-primary min-h-[calc(100vh-340px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small">
        <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
          <table className="w-full overflow-hidden min-w-max ">
            <TableHead
              tableHead={[
                { key: "name", value: "نام مخزن", isSorted: true },
                { key: "createDate", value: "تاریخ ایجاد", isSorted: true },
                { key: "role", value: "نقش من" },
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
                        {
                          data: repo.name,
                          className: "max-w-[200px] truncate",
                          title: repo.name,
                        },
                        {
                          data: FaDateFromTimestamp(+new Date(repo.createDate)),
                        },
                        { data: translateRoles(repo.roleName) },
                        {
                          data: <RepoMenu repo={repo} />,
                          stopPropagation: true,
                        },
                      ]}
                    />
                  );
                });
              })}
              <RenderIf isTrue={!!hasNextPage}>
                <tr>
                  <td colSpan={4} className="!text-center py-4">
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
      </div>
    );
  }

  return <EmptyList type={type} />;
};

export default TableView;
