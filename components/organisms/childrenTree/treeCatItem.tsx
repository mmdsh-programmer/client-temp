import { ChevronLeftIcon, FolderIcon } from "@components/atoms/icons";
import { Collapse, Radio, Typography } from "@material-tailwind/react";
import {
  ICategoryTreeItem,
  IDocumentTreeItem,
  categoryMoveDestAtom,
  categoryQueryParamsAtom,
} from "atom/category";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import TreeDocItem from "@components/molecules/treeDocItem/treeDocItem";
import { docTemplateFilter } from ".";
import { repoAtom } from "@atom/repository";
import { sortAtom } from "atom/sortParam";
import useGetChildren from "@hooks/category/useGetChildren";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

interface IProps {
  catItem: ICategoryTreeItem | IDocumentTreeItem;
  move?: boolean;
  enableAction?: boolean;
}

const TreeCatItem = ({ catItem, move, enableAction }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);
  const getSortParams = useRecoilValue(sortAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] = useRecoilState(categoryMoveDestAtom);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [openCategory, setOpenCategory] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const repoId =
    currentPath === "/admin/myDocuments" || currentPath === "/admin/dashboard"
      ? userInfo!.repository.id
      : getRepo!.id;

  const {
    data: categoryChildren,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetChildren(
    repoId || 0,
    categoryId,
    getSortParams,
    queryParams.limit,
    undefined,
    move ? "category" : undefined,
    move || enableAction ? undefined : docTemplateFilter,
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

  return catItem.type === "category" ? (
    <div
      className={`flex flex-col items-start ${catItem.active ? "" : "bg-gray-300"} category-tree-item`}
    >
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
        <div className="flex items-center bg-transparent p-2 ">
          <div className="flex items-center">
            <div
              className={`flex h-6 w-6 cursor-pointer items-center justify-center ${
                isOpen ? "-rotate-90" : ""
              }`}
              onClick={handleClick}
            >
              <ChevronLeftIcon className="h-3 w-3 stroke-icon-hover" />
            </div>
            <FolderIcon className="h-5 w-5 fill-gray-400" />
          </div>
          <Typography className="mr-2 lowercase text-primary_normal" key={catItem.id}>
            {catItem.name}
          </Typography>
          {enableAction ? (
            <div className="mr-4">
              <CategoryMenu category={catItem} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col pr-6">
        {isLoading && <div className="spinner" />}
        {!isLoading && openCategory === catItem.id && (
          <Collapse open={openCategory === catItem.id}>
            {categoryChildren?.pages.map((page) => {
              if (page.list.length) {
                return page.list.map((item: ICategoryMetadata | IDocumentMetadata) => {
                  if (item.type === "document") {
                    return !move ? (
                      <TreeDocItem key={item.id} docItem={item} enableAction={enableAction} />
                    ) : null;
                  }
                  return (
                    <TreeCatItem
                      catItem={item}
                      key={item.id}
                      move={move}
                      enableAction={enableAction}
                    />
                  );
                });
              }
              return (
                <Typography className="text-center text-xs" key={`doc-create-no-item-${page}`}>
                  موردی برای نمایش وجود ندارد
                </Typography>
              );
            })}
            <RenderIf isTrue={!!hasNextPage}>
              <LoadMore
                className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none"
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </RenderIf>
          </Collapse>
        )}
      </div>
    </div>
  ) : (
    <TreeDocItem key={catItem.id} docItem={catItem} enableAction={enableAction} />
  );
};

export default TreeCatItem;
