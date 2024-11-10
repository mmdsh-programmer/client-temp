import React, { Fragment, useState } from "react";
import SidebarCollapse from "./sidebarCollapse";
import { Spinner } from "@material-tailwind/react";
import SidebarDocumentItem from "./sidebarDocumentItem";
import { ICategoryMetadata } from "@interface/category.interface";
import useGetPublishChildren from "@hooks/publish/useGetPublishChildren";

interface IProps {
  repoId: number;
  repoName: string;
  category: ICategoryMetadata;
  parentUrl: string;
}

const SidebarCategoryItem = ({
  repoId,
  repoName,
  category,
  parentUrl,
}: IProps) => {
  const [shouldAddEndpoint, setShouldAddEndpoint] = useState(true);
  const [baseUrl, setBaseUrl] = useState(parentUrl);

  const {
    data: categoryChildren,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPublishChildren(repoId, 10, category.id);

  const total = categoryChildren?.pages[0].total;

  const buildUrl = (endpointName: string, endpointID: number) => {
    const fullEndpoint = `/${endpointName}/${endpointID}`;
    return shouldAddEndpoint
      ? baseUrl.concat(fullEndpoint)
      : baseUrl.replace(fullEndpoint, "");
  };

  const addEndpoint = (endpointName: string, endpointID: number) => {
    setShouldAddEndpoint(!shouldAddEndpoint);
    const newUrl = buildUrl(endpointName, endpointID);
    setBaseUrl(newUrl);
  };

  if (!isLoading && !total) {
    return (
      <span className="text-[10px] text-gray-700 pt-2 pb-3 pr-2">
        موردی برای نمایش وجود ندارد
      </span>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center py-2">
          <Spinner className="h-5 w-5" color="deep-purple" />
        </div>
      ) : (
        categoryChildren?.pages.map((page, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`fragment-card-${index}`}>
              {page.list?.length
                ? page.list.map((childItem, childIndex) => {
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
                          onClick={() => {
                            addEndpoint(
                              childItem.name.replace(/\s+/g, "-"),
                              childItem.id
                            );
                          }}
                        >
                          <SidebarCategoryItem
                            repoId={repoId}
                            repoName={repoName}
                            category={childItem}
                            parentUrl={baseUrl}
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
                          parentUrl={baseUrl}
                        />
                      );
                    }

                    return null;
                  })
                : null}
            </Fragment>
          );
        })
      )}

      {!!hasNextPage && !isFetchingNextPage && (
        <button
          className="underline underline-offset-8 text-[10px] text-primary mb-3 mt-2 w-fit"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isFetchingNextPage}
        >
          نمایش موارد بیشتر
        </button>
      )}

      {isFetchingNextPage && (
        <div className="w-full flex justify-center pt-4">
          <Spinner className="h-5 w-5" color="deep-purple" />
        </div>
      )}
    </>
  );
};

export default SidebarCategoryItem;
