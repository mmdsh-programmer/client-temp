import React, { useState } from "react";
import {
  ICategoryTreeItem,
  IDocumentTreeItem,
  categoryQueryParams,
} from "atom/category";
import { useRecoilValue } from "recoil";
import { sort } from "atom/sortParam";
import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import useGetChildren from "@hooks/category/useGetChildren";
import { repoAtom } from "@atom/repository";
import {
  ChevronLeftIcon,
  FolderIcon,
  InvisibleIcon,
} from "@components/atoms/icons";
import { Collapse } from "@material-tailwind/react";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import Text from "@components/atoms/typograghy/text";
import ButtonAtom from "@components/atoms/button";
import TreeDocItem from "./treeDocItem";
import { docTemplateFilter } from "./documentTemplateTree";

interface IProps {
  catItem: ICategoryTreeItem | IDocumentTreeItem;
}

const TreeCatItem = ({ catItem }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const queryParams = useRecoilValue(categoryQueryParams);
  const getSortParams = useRecoilValue(sort);

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
    getRepo?.id,
    categoryId,
    getSortParams,
    queryParams.limit,
    undefined,
    undefined,
    docTemplateFilter
  );

  const handleClick = () => {
    setCategoryId(catItem.id);
    setOpenCategory(openCategory ? null : catItem.id);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {catItem.type === "category" ? (
        <div className="flex flex-col items-start">
          <div className="flex">
            <ButtonAtom className="flex p-2 bg-transparent " onClick={handleClick}>
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
              <Text className="text-primary lowercase mr-2" key={catItem.id}>
                {catItem.name}
              </Text>
            </ButtonAtom>
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
                          return <TreeDocItem key={item.id} docItem={item} />;
                        }
                        return <TreeCatItem catItem={item} key={item.id} />;
                      }
                    );
                  }
                  return (
                    <Text
                      className="text-xs text-center"
                      key={`doc-create-no-item-${page.page}`}
                    >
                      موردی برای نمایش وجود ندارد
                    </Text>
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
