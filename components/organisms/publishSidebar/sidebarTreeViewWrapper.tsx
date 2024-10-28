import React, { Fragment, useEffect, useRef, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { TUserData } from "@interface/app.interface";
import useDebounce from "@hooks/custom/useDebounce";
import { ISortProps } from "@atom/sortParam";
import useGetUser from "@hooks/auth/useGetUser";
import SidebarCollapse from "./sidebarCollapse";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import SidebarCategoryItem from "./sidebarCategoryItem";
import SidebarDocumentItem from "./sidebarDocumentItem";
import { SearchIcon, XIcon } from "@components/atoms/icons";
import { Spinner } from "@material-tailwind/react";
import Error from "@components/organisms/error";
import useGetPublishChildren from "@hooks/publish/useGetPublishChildren";
import useGetAllPublishChildren from "@hooks/publish/useGetAllPublishChildren";
import { IListResponse } from "@interface/repo.interface";

interface IProps {
  repoId: number;
  repoName: string;
  userInfo?: TUserData;
}

export const sortParams = {
  order: "asc",
  type: "asc",
  name: "asc",
  createdAt: "asc",
} as ISortProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidebarTreeView = ({ repoId, userInfo, repoName }: IProps) => {
  const searchTimeout = 1500;
  const [searchInput, setSearchInput] = useState<string>("");
  const [manualSearch, setManualSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchInput, searchTimeout);
  const pathname = usePathname();

  const rootUrl = useMemo(() => {
    return pathname ? pathname.split("/").slice(0, 4).join("/") : "#";
  }, [pathname]);

  useEffect(() => {
    setManualSearch(searchInput);
  }, [debouncedValue]);

  const {
    data: categoryList,
    isLoading: isLoadingChildren,
    isFetchingNextPage: isFetchingChildrenNextPage,
    hasNextPage: childrenHasNextPage,
    fetchNextPage,
  } = useGetPublishChildren(repoId, 10, undefined, true);

  const {
    data: searchList,
    isLoading: isLoadingSearch,
    isFetchingNextPage: isFetchingSearchNextPage,
    hasNextPage: searchHasNextPage,
    fetchNextPage: fetchNextSearchPage,
  } = useGetAllPublishChildren(
    repoId,
    10,
    undefined,
    manualSearch,
    !!manualSearch
  );

  const index = useRef(-1);

  const onSubmit = () => {
    return setManualSearch(searchInput);
  };

  const handleClose = () => {
    setSearchInput("");
    setManualSearch("");
    index.current = -1;
  };

  const overalLoading =
    searchInput && manualSearch ? isLoadingSearch : isLoadingChildren;
  const renderTree = searchInput && manualSearch ? searchList : categoryList;
  const fetchingNextPage =
    searchInput && manualSearch
      ? isFetchingSearchNextPage
      : isFetchingChildrenNextPage;
  const nextPageExist =
    searchInput && manualSearch ? searchHasNextPage : childrenHasNextPage;

  const renderItems = (
    page: IListResponse<ICategoryMetadata | IDocumentMetadata>,
    renderTreeIndex: number
  ) => {
    return (
      <Fragment key={`fragment-card-${renderTreeIndex}`}>
        {page.list?.length
          ? page.list.map((childItem, childIndex: number) => {
              if (
                childItem &&
                childItem.type === "category" &&
                !childItem.isHidden
              ) {
                return (
                  <SidebarCollapse
                    // eslint-disable-next-line react/no-array-index-key
                    key={`category-${childItem.id}-tree-item-${childIndex}`}
                    title={childItem?.name || "بدون نام"}
                  >
                    <SidebarCategoryItem
                      repoId={repoId}
                      repoName={repoName || " "}
                      category={childItem}
                      parentUrl={`/publish/${repoId}/${repoName}`}
                    />
                  </SidebarCollapse>
                );
              }
              if (
                childItem &&
                childItem.type === "document" &&
                !childItem.isHidden
              ) {
                return (
                  <SidebarDocumentItem
                    key={`category-${childItem.categoryId}-document-${childItem.id}-tree-item`}
                    document={childItem}
                    parentUrl={`/publish/${repoId}/${repoName}`}
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
    <div className="h-full pb-11 w-100">
      <div className="text-xl font-bold text-[#3e4a4d] text-center mt-4 mb-4 pb-4 border-b border-solid border-[rgba(0,0,0,0.08)]">
        <Link prefetch={false} href={rootUrl}>
          {repoName || ""}
        </Link>
        <div className="search-input flex justify-center w-full group mt-2 border-spacing-1 border-2 rounded-lg text-xs h-9">
          <input
            type="text"
            className="pr-2 w-full rounded-r-[5px] focus:outline-none placeholder:text-xs text-black text-xs"
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
          <div className="flex items-center justify-center p-1.5 bg-white rounded-l-[5px]">
            {searchInput && manualSearch ? (
              <div className="flex">
                <div className="flex justify-center items-center mr-1">
                  <div className="w-[1px] h-5 bg-gray-400" />
                </div>
                <button className="p-1 rounded-[5px]" onClick={handleClose}>
                  <XIcon className="w-4 h-4 fill-gray-400" />
                </button>
              </div>
            ) : (
              <button className="p-1 rounded-[5px]" onClick={onSubmit}>
                <SearchIcon className="w-4 h-4 stroke-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-315px)] overflow-y-auto pl-2">
        {overalLoading ? (
          <div className="w-full flex justify-center pt-4">
            <Spinner className="h-5 w-5" color="deep-purple" />
          </div>
        ) : (
          renderTree?.pages.map((page, pageIndex) => {
            return renderItems(page, pageIndex);
          })
        )}

        {!searchInput && !!nextPageExist && !fetchingNextPage ? (
          <button
            className="underline underline-offset-8 text-[8px] text-gray-70 mt-2 mx-auto"
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
              className="underline underline-offset-8 text-[8px] text-gray-700 mx-auto mt-2"
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
          <div className="w-full flex justify-center pt-4">
            <Spinner className="h-5 w-5" color="deep-purple" />
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarTreeViewWrapper = ({
  repoId,
  repoName,
}: {
  repoId: number;
  repoName: string;
}) => {
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
        <div className="w-full flex justify-center pt-4">
          <Spinner className="h-5 w-5" color="deep-purple" />
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
  return (
    <SidebarTreeView repoName={repoName} repoId={repoId} userInfo={userInfo} />
  );
};

export default SidebarTreeViewWrapper;
