import React, { ChangeEvent, useState } from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import TableHead from "@components/molecules/tableHead";
import useGetAllRepositories from "@hooks/repository/useGetAllRepositories";
import { Spinner, Typography } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import RepoMenu from "@components/molecules/repoMenu";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import RepoCardBody from "@components/molecules/repoCardBody";
import Image from "next/image";
import { SearchIcon } from "@components/atoms/icons";
import { ERepoGrouping } from "@interface/enums";
import useGetSearchAllRepo from "@hooks/repository/useGetSearchAllRepo";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import InputAtom from "@components/atoms/input";
import SelectAtom from "@components/atoms/select/select";

const AllRepoList = () => {
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string | undefined>(undefined);
  const [repoType, setRepoType] = useState<ERepoGrouping>(
    ERepoGrouping.ALL_REPO
  );

  const repoTypeOptions = [
    { value: ERepoGrouping.ALL_REPO, label: "همه‌ی مخزن ‌ها" },
    { value: ERepoGrouping.MY_REPO, label:"مخزن‌های من" },
    { value: ERepoGrouping.ACCESS_REPO, label: "مخزن‌های اشتراکی" },
    { value: ERepoGrouping.BOOKMARK_REPO, label: "مخزن‌های نشان‌شده" },
    { value: ERepoGrouping.ARCHIVE_REPO, label: "مخزن‌های بایگانی" },
  ];

  const {
    data: getRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetAllRepositories(10);

  const {
    data: getSearchRepoList,
    hasNextPage: hasNextPageSearch,
    fetchNextPage: fetchNextPageSearch,
    isFetchingNextPage: isFetchingNextPageSearch,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useGetSearchAllRepo(30, searchParam, repoType === ERepoGrouping.ALL_REPO);

  const { data: getMyRepoList, isLoading: isLoadingMyRepoList } =
    useGetMyRepoList(
      30,
      false,
      searchParam,
      repoType === ERepoGrouping.MY_REPO
    );

  const listLength = searchParam
    ? getSearchRepoList?.pages[0].total || getMyRepoList?.pages[0].total
    : getRepoList?.pages[0].total;

  const list = searchParam ? getSearchRepoList || getMyRepoList : getRepoList;
  return (
    <div className="xs:p-5 w-full  overflow-auto shadow-small">
      <div className="hidden w-full gap-2 xs:flex justify-between pb-5">
        <div
          className="flex flex-grow gap-2 w-[100px] max-w-[300px] ml-2 items-center h-9 px-3 border-[1px] border-normal bg-primary rounded-lg "
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              if (search) {
                setSearchParam(search);
              } else {
                setSearchParam(undefined);
              }
            }
          }}
        >
          <SearchIcon className="h-5 w-5 stroke-icon-hover" />
          <InputAtom
            placeholder="جستجو ..."
            className="text-sm outline-none overflow-hidden border-none focus:border-none !w-auto"
            setValue={(value) => {
              setSearch(value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <SelectAtom
          className="w-[150px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal"
          defaultOption={ERepoGrouping.ALL_REPO}
          options={repoTypeOptions}
          selectedOption={repoType}
          setSelectedOption={setRepoType}
        />
        </div>
      </div>
      {isLoading ||
      (searchParam && isLoadingSearch) ||
      (searchParam && isLoadingMyRepoList) ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="purple" />
        </div>
      ) : listLength ? (
        <>
          <div className="hidden xs:flex flex-col w-full rounded-lg border-2 border-gray-100 h-auto overflow-auto shadow-none">
            <div className=" rounded-lg shadow-none">
              <table className="w-full min-w-max table-auto ">
                <TableHead
                  tableHead={[
                    { key: "name", value: "نام مخزن", isSorted: true },
                    { key: "createDate", value: "تاریخ ایجاد", isSorted: true },
                    { key: "role", value: "نقش من" },
                    { key: "status", value: "وضعیت" },
                    {
                      key: "action",
                      value: "عملیات",
                      className: "",
                    },
                  ]}
                />
                <tbody>
                  {list?.pages.map((page) => {
                    return page.list.map((repo) => {
                      return (
                        <TableCell
                          navigateTo={`/admin/repositories?repoId=${repo.id}`}
                          key={`repo-table-item-${repo.id}`}
                          tableCell={[
                            { data: repo.name },
                            {
                              data: FaDateFromTimestamp(
                                +new Date(repo.createDate)
                              ),
                            },
                            { data: translateRoles(repo.roleName) },
                            {
                              data: repo.isArchived ? "غیرفعال" : "فعال",
                              className: `${repo.isArchived ? "text-critical-normal" : "text-success-normal"}`,
                            },
                            {
                              data: <RepoMenu repo={repo} />,
                            },
                          ]}
                        />
                      );
                    });
                  })}
                  <RenderIf
                    isTrue={
                      !!hasNextPage || !!(searchParam && !!hasNextPageSearch)
                    }
                  >
                    <tr>
                      <td colSpan={3} className="!text-center">
                        <LoadMore
                          className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                          isFetchingNextPage={
                            searchParam
                              ? isFetchingNextPage
                              : isFetchingNextPage
                          }
                          fetchNextPage={
                            searchParam ? fetchNextPageSearch : fetchNextPage
                          }
                        />
                      </td>
                    </tr>
                  </RenderIf>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-4 xs:hidden">
            {getRepoList?.pages.map((page) => {
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
                            <Image
                              className="object-cover"
                              src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repo.imageFileHash}`}
                              alt="repo-image"
                              width={100}
                              height={100}
                            />
                          ) : null
                        }
                        title={repo.name}
                      >
                        <RepoMenu repo={repo} />
                      </RepoCardBody>
                    </div>
                    <div className="flex px-3 justify-between pt-1 pb-4">
                      <Typography
                        placeholder=""
                        className="font-iranYekan text-placeholder text-xs"
                      >
                        تاریخ ایجاد
                      </Typography>
                      <Typography
                        placeholder=""
                        className="font-iranYekan text-xs text-primary"
                      >
                        {FaDateFromTimestamp(+new Date(repo.createDate))}
                      </Typography>
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
      ) : (
        <EmptyList type={EEmptyList.DASHBOARD} />
      )}
    </div>
  );
};

export default AllRepoList;
