import React, { useMemo } from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import TableHead from "@components/molecules/tableHead";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import RepoMenu from "@components/molecules/repoMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { useRecoilValue } from "recoil";
import { repoSearchParamAtom } from "@atom/repository";
import RepoSearch from "../../molecules/repoSearch";
import { EListMode, ERepoGrouping } from "@interface/enums";
import useGetAllRepositories from "@hooks/repository/useGetAllRepositories";
import useGetAccessList from "@hooks/repository/useGetAccessList";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import useGetBookmarkList from "@hooks/repository/useGetBookmarkList";
import MobileView from "../repoView/mobileView";
import { listModeAtom } from "@atom/app";
import CardView from "../repoView/cardView";

const AllRepoList = () => {
  const mode = useRecoilValue(listModeAtom);
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const repoType = getSearchParam?.repoType;
  const search = getSearchParam?.search;

  const allRepos = useGetAllRepositories(20, undefined, true);
  const searchAllRepos = useGetAllRepositories(20, search, true);
  const myRepos = useGetMyRepoList(
    20,
    repoType === ERepoGrouping.ARCHIVE_REPO,
    search,
    false,
    repoType === ERepoGrouping.MY_REPO ||
      repoType === ERepoGrouping.ARCHIVE_REPO,
  );
  const accessRepos = useGetAccessList(
    20,
    search,
    repoType === ERepoGrouping.ACCESS_REPO
  );
  const bookmarkRepos = useGetBookmarkList(
    20,
    search,
    repoType === ERepoGrouping.BOOKMARK_REPO
  );

  const {
    data: repoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMemo(() => {
    if (search) {
      switch (repoType) {
        case ERepoGrouping.MY_REPO:
        case ERepoGrouping.ARCHIVE_REPO:
          return myRepos;
        case ERepoGrouping.ACCESS_REPO:
          return accessRepos;
        case ERepoGrouping.BOOKMARK_REPO:
          return bookmarkRepos;
        default:
          return searchAllRepos;
      }
    } else {
      return allRepos;
    }
  }, [
    repoType,
    search,
    allRepos,
    searchAllRepos,
    myRepos,
    accessRepos,
    bookmarkRepos,
  ]);

  const listLength = useMemo(() => {
    return repoList?.pages[0]?.total || 0;
  }, [repoList]);
  const listLengthAllRepos = useMemo(() => {
    return allRepos?.data?.pages[0]?.total || 0;
  }, [allRepos]);
  const isLoadingAllRepos = allRepos?.isLoading;
  const renderTableRows = () => {
    return repoList?.pages.map((page) => {
      return page.list.map((repo) => {
        return (
          <TableCell
            key={`repo-table-item-${repo.id}`}
            navigateTo={
              !repo.isArchived
                ? `/admin/repositories?repoId=${repo.id}`
                : undefined
            }
            tableCell={[
              { data: repo.name },
              { data: FaDateFromTimestamp(+new Date(repo.createDate)) },
              { data: translateRoles(repo.roleName) },
              {
                data: repo.isArchived ? "غیرفعال" : "فعال",
                className: repo.isArchived
                  ? "text-critical-normal"
                  : "text-success-normal",
              },
              { data: <RepoMenu repo={repo} />, stopPropagation: true },
            ]}
          />
        );
      });
    });
  };

  const renderRepoContent = () => {
    if (isLoading && !!search) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      );
    }

    if (listLength) {
      return (
        <>
          <RenderIf isTrue={mode === EListMode.table}>
            <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
              <table className="w-full overflow-hidden min-w-max">
                <TableHead
                  tableHead={[
                    { key: "name", value: "نام مخزن", isSorted: true },
                    { key: "createDate", value: "تاریخ ایجاد", isSorted: true },
                    { key: "role", value: "نقش من" },
                    { key: "status", value: "وضعیت" },
                    {
                      key: "action",
                      value: "عملیات",
                      className: "justify-end",
                    },
                  ]}
                />
                <tbody>
                  {renderTableRows()}
                  <RenderIf isTrue={hasNextPage}>
                    <tr>
                      <td colSpan={5} className="!text-center">
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
          </RenderIf>
          <RenderIf isTrue={mode === EListMode.card}>
            <CardView
              isLoading={isLoadingAllRepos || isLoading}
              getRepoList={repoList}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              type={search ? EEmptyList.FILTER : EEmptyList.DASHBOARD}
            />
          </RenderIf>
        </>
      );
    }

    return <EmptyList type={EEmptyList.FILTER} />;
  };

  const handleList = () => {
    if (isLoadingAllRepos) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      );
    }

    if (!listLengthAllRepos) {
      return <EmptyList type={EEmptyList.DASHBOARD} />;
    }

    return (
      <>
        <RepoSearch />
        {renderRepoContent()}
      </>
    );
  };

  return (
    <>
      <div className="hidden xs:block">
        <div className="flex flex-col h-full bg-primary p-5 min-h-[calc(100vh-340px)] flex-grow flex-shrink-0 rounded-lg shadow-small">
          {handleList()}
        </div>
      </div>
      <div className="flex flex-col h-full min-h-[calc(100vh-340px)] xs:hidden gap-y-4">
        <MobileView
          isLoading={isLoadingAllRepos || isLoading}
          getRepoList={repoList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          type={search ? EEmptyList.FILTER : EEmptyList.DASHBOARD}
        />
      </div>
    </>
  );
};

export default React.memo(AllRepoList);
