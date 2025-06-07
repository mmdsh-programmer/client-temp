import EmptyList, { EEmptyList } from "../emptyList";
import React, { Fragment, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import RenderIf from "@components/atoms/renderIf";
import { ResultItem } from "../searchContentItem";
import { categorySearchContentParamAtom } from "atom/category";
import { useRecoilValue } from "recoil";
import useSearchContent from "@hooks/content/useSearchContent";

const SearchContentResult = ({ repoId }: { repoId: number }) => {
  const listInnerRef = useRef(null);
  const [, setDisabled] = useState(false);

  const getSearchParam = useRecoilValue(categorySearchContentParamAtom);

  const {
    isLoading,
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchContent(repoId, getSearchParam, 15);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 30 > scrollHeight && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <div
      className="dialog-content flex flex-col min-h-[100px] max-h-64 overflow-y-auto px-2"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <RenderIf isTrue={!getSearchParam}>
        <Typography className="text__label__button text-hint text-right pt-4">
          کادر جست و جو بالا را تکمیل کنید...
        </Typography>
      </RenderIf>
      {isLoading ? (
        <div className="w-full flex justify-center pt-4">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      ) : (
        <ul className="flex flex-col gap-2" role="menu">
          {searchResult?.pages.map((page) => {
            return (
              <Fragment key={`fragment-${page.offset}`}>
                {page.total ? (
                  page.list.map((resultItem) => {
                    return (
                      <ResultItem
                        key={`content-search-${resultItem.versionId}`}
                        data={resultItem}
                        onClick={() => {
                          setDisabled(true);
                        }}
                      />
                    );
                  })
                ) : (
                  <EmptyList type={EEmptyList.FILTER} />
                )}
              </Fragment>
            );
          })}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center pt-4">
              <Spinner className="h-5 w-5 text-primary" />
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchContentResult;
