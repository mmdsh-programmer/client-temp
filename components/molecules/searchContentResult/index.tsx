import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { categorySearchContentParam } from "atom/category";
import { ResultItem } from "../searchContentItem";
import { repoAtom } from "@atom/repository";
import RenderIf from "@components/atoms/renderIf";
import useSearchContent from "@hooks/content/useSearchContent";
import { Spinner, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "../emptyList";

const SearchContentResult = () => {
  const listInnerRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const getRepo = useRecoilValue(repoAtom);
  const getSearchParam = useRecoilValue(categorySearchContentParam);
  const {
    isLoading,
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchContent(getRepo?.id!, getSearchParam, 15);

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
          <Spinner className="h-5 w-5" color="deep-purple" />
        </div>
      ) : (
        <ul className="flex flex-col gap-2" role="menu">
          {searchResult?.pages.map((page, index) => {
            return (
              <Fragment key={`fragment-${index}`}>
                {page.total ? (
                  page.list.map((resultItem, pageIndex) => {
                    return (
                      <ResultItem
                        key={`content-search-${pageIndex}`}
                        data={resultItem}
                        disabled={disabled}
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
              <Spinner className="h-5 w-5" color="deep-purple" />
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchContentResult;
