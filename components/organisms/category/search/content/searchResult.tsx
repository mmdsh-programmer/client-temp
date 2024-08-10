import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { categorySearchContentParam } from "atom/category";
import { ResultItem } from "./resultItem";
import { repoAtom } from "@atom/repository";
import RenderIf from "@components/renderIf";
import useSearchContent from "@hooks/content/useSearchContent";

export const SearchResult = () => {
  const listInnerRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const getRepo = useRecoilValue(repoAtom);
  const getSearchParam = useRecoilValue(categorySearchContentParam);
  const {
    isLoading,
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchContent(getRepo?.id, getSearchParam,15 );

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
      className="dialog-content mt-9 min-h-[100px] max-h-64 overflow-y-auto px-2"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      {/* <RenderIf isTrue={!getSearchParam}>
        <p className="text-base text-right font-iranYekan">
          کادر جست و جو بالا را تکمیل کنید...
        </p>
      </RenderIf> */}
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="spinner" />
        </div>
      ) : (
        <ul className="flex flex-col gap-2" role="menu">
          {searchResult?.pages.map((page, index) => {
            return (
            // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`fragment-${index}`}>
                {page.list?.length ? (
                  page.list.map((resultItem, pageIndex) => {
                    return (
                      <ResultItem // eslint-disable-next-line react/no-array-index-key
                        key={`content-search-${pageIndex}`}
                        data={resultItem}
                        disabled={disabled}
                        onClick={() => { setDisabled(true); }}
                      />
                    );
                  })
                ) : (
                  <li className="flex items-center">
                    <p className="text-base text-right font-iranYekan">
                      موردی برای نمایش وجود ندارد
                    </p>
                  </li>
                )}
              </Fragment>
            );
          })}

          {isFetchingNextPage && (
          <div className="w-full flex justify-center">
            <div className="spinner" />
          </div>
          )}
        </ul>
      )}
    </div>
  );
};
