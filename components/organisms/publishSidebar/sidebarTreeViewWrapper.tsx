"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "@components/atoms/icons";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@components/organisms/error";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { IListResponse } from "@interface/repo.interface";
import Link from "next/link";
import SidebarCategoryItem from "./sidebarCategoryItem";
import SidebarCollapse from "./sidebarCollapse";
import SidebarDocumentItem from "./sidebarDocumentItem";
import { toPersianDigit } from "@utils/index";
import { Spinner } from "@components/atoms/spinner";
import useDebounce from "@hooks/custom/useDebounce";
import useGetAllPublishChildren from "@hooks/publish/useGetAllPublishChildren";
import useGetPublishChildren from "@hooks/publish/useGetPublishChildren";
import useGetUser from "@hooks/auth/useGetUser";
import { ISortProps } from "@store/sortParam";

interface IProps {
  repoId: number;
  repoName: string;
  categoryIds: number[];
}

export const sortParams = {
  order: "asc",
  type: "asc",
  name: "asc",
  createdAt: "asc",
} as ISortProps;

const searchTimeout = 1500;

const SidebarTreeView = ({ repoId, repoName, categoryIds }: IProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [manualSearch, setManualSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchInput, searchTimeout);
  const searchParams = useSearchParams();

  useEffect(() => {
    setManualSearch(searchInput);
  }, [debouncedValue]);

  const {
    data: categoryList,
    isLoading: isLoadingChildren,
    isFetchingNextPage: isFetchingChildrenNextPage,
    hasNextPage: childrenHasNextPage,
    fetchNextPage,
  } = useGetPublishChildren(repoId, 20, undefined, true);

  const {
    data: searchList,
    isLoading: isLoadingSearch,
    isFetchingNextPage: isFetchingSearchNextPage,
    hasNextPage: searchHasNextPage,
    fetchNextPage: fetchNextSearchPage,
  } = useGetAllPublishChildren(repoId, 20, undefined, manualSearch, !!manualSearch);

  const index = useRef(-1);

  const onSubmit = () => {
    return setManualSearch(searchInput);
  };

  const handleClose = () => {
    setSearchInput("");
    setManualSearch("");
    index.current = -1;
  };

  const overalLoading = searchInput && manualSearch ? isLoadingSearch : isLoadingChildren;
  const renderTree = searchInput && manualSearch ? searchList : categoryList;
  const fetchingNextPage =
    searchInput && manualSearch ? isFetchingSearchNextPage : isFetchingChildrenNextPage;
  const nextPageExist = searchInput && manualSearch ? searchHasNextPage : childrenHasNextPage;

  const ids = searchParams.get("ids");

  const renderItems = (
    page: IListResponse<ICategoryMetadata | IDocumentMetadata>,
    renderTreeIndex: number,
  ) => {
    return (
      <Fragment key={`fragment-card-${renderTreeIndex}`}>
        {page.list?.length
          ? page.list.map((childItem) => {
              if (childItem && childItem.type === "category" && !childItem.isHidden) {
                const catIds = [...categoryIds, childItem.id];
                const defaultState = ids?.includes(toPersianDigit(childItem.id).toString());
                return (
                  <SidebarCollapse
                    key={`category-${childItem.id}-tree-item-${childItem.id}`}
                    title={childItem?.name || "بدون نام"}
                    defaultOpen={defaultState}
                  >
                    <SidebarCategoryItem
                      repoId={repoId}
                      repoName={repoName || " "}
                      category={childItem}
                      parentUrl={`/${repoName}/${repoId}`}
                      categoryIds={catIds}
                    />
                  </SidebarCollapse>
                );
              }
              if (childItem && childItem.type === "document" && !childItem.isHidden) {
                return (
                  <SidebarDocumentItem
                    key={`category-${childItem.categoryId}-document-${childItem.id}-tree-item`}
                    document={childItem}
                    parentUrl={`/${repoName}/${repoId}`}
                    categoryIds={categoryIds}
                  />
                );
              }
              return null;
            })
          : null}
      </Fragment>
    );
  };

  return (
    <div className="w-100 h-[calc(100vh-97px)]">
      <div className="mb-4 mt-4 border-b border-solid border-[rgba(0,0,0,0.08)] pb-4 text-center text-xl font-bold text-[#3e4a4d]">
        <Link
          className="block overflow-hidden text-ellipsis whitespace-nowrap"
          prefetch={false}
          href={`/publish/${repoName}/${toPersianDigit(repoId)}`}
        >
          {repoName?.replaceAll("-", " ") || ""}
        </Link>
        <div className="search-input group mt-2 flex h-9 w-full border-spacing-1 justify-center rounded-lg border-2 text-xs">
          <input
            type="text"
            className="w-full rounded-r-[5px] pr-2 text-xs text-black placeholder:text-xs focus:outline-none"
            placeholder="جست و جو نام سند یا دسته بندی ..."
            autoComplete="off"
            value={searchInput}
            onChange={(e) => {
              if (/^.*?(?=[#$%&*/:<>?^{|}]).*$/.test(e.target.value)) {
                e.preventDefault();
                return;
              }
              setSearchInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") onSubmit();
              if (e.key === "Escape") handleClose();
            }}
          />
          <div className="flex items-center justify-center rounded-l-[5px] bg-white p-1.5">
            {searchInput && manualSearch ? (
              <div className="flex">
                <div className="mr-1 flex items-center justify-center">
                  <div className="h-5 w-[1px] bg-gray-400" />
                </div>
                <button className="rounded-[5px] p-1" onClick={handleClose}>
                  <XIcon className="h-4 w-4 fill-gray-400" />
                </button>
              </div>
            ) : (
              <button className="rounded-[5px] p-1" onClick={onSubmit}>
                <SearchIcon className="h-4 w-4 stroke-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-220px)] overflow-y-auto pl-2">
        {overalLoading ? (
          <div className="flex w-full justify-center pt-4">
            <Spinner className="h-5 w-5 text-primary" />
          </div>
        ) : (
          renderTree?.pages.map((page, pageIndex) => {
            return renderItems(page, pageIndex);
          })
        )}

        {!searchInput && !!nextPageExist && !fetchingNextPage ? (
          <button
            className="text-gray-70 mx-auto mt-2 text-[8px] underline underline-offset-8"
            onClick={() => {
              return fetchNextPage();
            }}
            disabled={fetchingNextPage}
          >
            نمایش موارد بیشتر
          </button>
        ) : (
          searchInput &&
          !!nextPageExist &&
          !fetchingNextPage && (
            <button
              className="mx-auto mt-2 text-[8px] text-gray-700 underline underline-offset-8"
              onClick={() => {
                return fetchNextSearchPage();
              }}
              disabled={fetchingNextPage}
            >
              نمایش موارد بیشتر
            </button>
          )
        )}

        {fetchingNextPage && (
          <div className="flex w-full justify-center pt-4">
            <Spinner className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarTreeViewWrapper = ({ repoId, repoName }: { repoId: number; repoName: string }) => {
  const authenticated = window.localStorage.getItem("AUTHENTICATED") === "true";
  const { data: userInfo, isFetching } = useGetUser();
  const router = useRouter();

  const handleReset = () => {
    window.localStorage.removeItem("AUTHENTICATED");
    router.refresh();
  };

  if (isFetching) {
    return (
      <div className="h-[calc(100vh-200px)]">
        <div className="flex w-full justify-center pt-4">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      </div>
    );
  }

  if (authenticated && !userInfo) {
    return (
      <Error
        error={{ message: "اطلاعات کاربر یافت نشد. لطفا مجدد تلاش کنید" }}
        retry={handleReset}
      />
    );
  }
  return <SidebarTreeView repoName={repoName} repoId={repoId} categoryIds={[]} />;
};

export default SidebarTreeViewWrapper;
