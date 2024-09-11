import {
  ChevronLeftIcon,
  FolderIcon,
  InvisibleIcon,
} from "@components/atoms/icons";
import { Collapse, Radio, Typography } from "@material-tailwind/react";
import {
  ICategoryTreeItem,
  IDocumentTreeItem,
  categoryMoveDestAtom,
  categoryQueryParamsAtom,
} from "atom/category";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import TreeDocItem from "@components/molecules/treeDocItem/treeDocItem";
import { docTemplateFilter } from ".";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "atom/sortParam";
import useGetChildren from "@hooks/category/useGetChildren";

interface IProps {
  catItem: ICategoryTreeItem | IDocumentTreeItem;
  move?: boolean;
}

const TreeCatItem = ({ catItem, move }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDestAtom);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [openCategory, setOpenCategory] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: categoryChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetChildren(
    getRepo?.id || 0,
    categoryId,
    getSortParams,
    queryParams.limit,
    undefined,
    move ? "category" : undefined,
    move ? undefined : docTemplateFilter
  );

  const handleClick = () => {
    setCategoryId(catItem.id);
    setOpenCategory(openCategory ? null : catItem.id);
    setIsOpen(!isOpen);
  };

  const handleSelectDestinationCat = () => {
    if (getCategoryMoveDest?.id === catItem.id) {
      setCategoryMoveDest(null);
    } else {
      setCategoryMoveDest(catItem as ICategoryMetadata);
    }
  };

  return (
    <div>
      {catItem.type === "category" ? (
        <div className="flex flex-col items-start">
          <div className="flex">
            {move && (
              <Radio
                containerProps={{ className: "!p-0" }}
                className="transition-all hover:scale-105 hover:before:opacity-0"
                ripple={false}
                color="deep-purple"
                crossOrigin=""
                onChange={handleSelectDestinationCat}
                checked={getCategoryMoveDest?.id === catItem.id}
              />
            )}
            <div
              className="flex items-center p-2 bg-transparent "
              onClick={handleClick}
            >
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center cursor-pointer h-6 w-6 ${
                    isOpen ? "-rotate-90" : ""
                  }`}
                >
                  <ChevronLeftIcon className="h-3 w-3 stroke-icon-hover" />
                </div>
                <FolderIcon className="fill-gray-400 w-5 h-5" />
                {catItem.isHidden && (
                  <InvisibleIcon className="w-5 h-5 stroke-neutral-content flex-none" />
                )}
              </div>
              <Typography
                className="text-primary lowercase mr-2"
                key={catItem.id}
              >
                {catItem.name}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col pr-6">
            {isLoading && <div className="spinner" />}
            {!isLoading && openCategory === catItem.id && (
              <Collapse open={openCategory === catItem.id}>
                {categoryChildren?.pages.map((page) => {
                  if (page.list.length) {
                    return page.list.map(
                      (item: ICategoryMetadata | IDocumentMetadata) => {
                        if (item.type === "document") {
                          return !move ? (
                            <TreeDocItem key={item.id} docItem={item} />
                          ) : null;
                        }
                        return (
                          <TreeCatItem
                            catItem={item}
                            key={item.id}
                            move={move}
                          />
                        );
                      }
                    );
                  }
                  return (
                    <Typography
                      className="text-xs text-center"
                      key={`doc-create-no-item-${page}`}
                    >
                      موردی برای نمایش وجود ندارد
                    </Typography>
                  );
                })}
                <RenderIf isTrue={!!hasNextPage}>
                  <LoadMore
                    className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </RenderIf>
              </Collapse>
            )}
          </div>
        </div>
      ) : (
        <TreeDocItem key={catItem.id} docItem={catItem} />
      )}
    </div>
  );
};

export default TreeCatItem;
