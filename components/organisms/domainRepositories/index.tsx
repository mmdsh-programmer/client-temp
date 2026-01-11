import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner } from "@components/atoms/spinner";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import useGetDomainPublishRepoList from "@hooks/domain/useGetDomainPublishRepoList";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";
import { Card, Typography } from "@material-tailwind/react";
import TableHead from "@components/molecules/tableHead";
import RepoItem from "./repoItem";

interface ITableHead {
  key: string;
  value: string;
  isSorted?: boolean;
  className?: string;
}

const DomainRepositoriesManagement = () => {
  const {
    data: publishRepoList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDomainPublishRepoList(30);

  const listLength = publishRepoList?.pages[0].total;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex !h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      );
    }
    if (listLength) {
      return (
        <div className="category-table-view overflow-auto px-5 py-4">
          <div className="w-full overflow-auto rounded-lg border-[0.5px] border-normal">
            <table className="w-full min-w-max table-auto overflow-hidden">
              <TableHead
                tableHead={
                  [
                    {
                      key: "order",
                      value: "اولویت",
                      className: "categoryOrder whitespace-nowrap !px-4 !max-w-[70px] !w-[70px]",
                    },
                    {
                      key: "name",
                      value: "نام مخزن",
                    },
                    {
                      key: "creator",
                      value: "نام سازنده",
                      className: "whitespace-nowrap !max-w-[70px] !w-[70px]",
                    },
                    {
                      key: "action",
                      value: "عملیات",
                      className: "publish-repo-action !max-w-[50px] !w-[50px]",
                    },
                  ].filter(Boolean) as ITableHead[]
                }
              />
              <tbody>
                {publishRepoList?.pages.map((page) => {
                  return page.list.map((item) => {
                    return <RepoItem repo={item} />;
                  });
                })}
                <RenderIf isTrue={!!hasNextPage}>
                  <tr>
                    <td colSpan={7} className="py-4 !text-center">
                      <div className="flex items-center justify-center">
                        <LoadMore
                          className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none xl:bg-primary"
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
    return <EmptyList type={EEmptyList.PUBLISHED_REPO} />;
  };

  return <div className="mt-4 h-full pb-4">{renderContent()}</div>;
};

export default DomainRepositoriesManagement;
