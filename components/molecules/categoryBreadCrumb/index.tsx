import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { categoryAtom, categoryShowAtom } from "atom/category";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ICategoryMetadata } from "@interface/category.interface";
import { bulkItemsAtom } from "atom/bulk";

const CategoryBreadCrumb = () => {
  const setCategory = useSetRecoilState(categoryAtom);
  const [getCategoryShow, setCategoryShow] = useRecoilState(categoryShowAtom);
  const setBulkItems = useSetRecoilState(bulkItemsAtom);

  const [breadCrumb, setBreadCrumb] = useState<ICategoryMetadata[]>([]);

  useEffect(() => {
    const existInBreadCrumb = breadCrumb?.filter((breadItem) => {
      return breadItem.id === getCategoryShow?.id;
    });
    if (!existInBreadCrumb?.length && getCategoryShow) {
      setBreadCrumb([...breadCrumb, getCategoryShow]);
    } else if (existInBreadCrumb?.length && getCategoryShow) {
      const selectedCategoryIndex = breadCrumb.findIndex((breadItem) => {
        return breadItem.id === getCategoryShow.id;
      });
      const breadCrumbTemp = [...breadCrumb];
      breadCrumbTemp.splice(
        selectedCategoryIndex + 1,
        breadCrumb.length - selectedCategoryIndex + 1,
      );
      setBreadCrumb(breadCrumbTemp);
    }
  }, [getCategoryShow]);

  return (
    <div className="category-breadcrumb flex text-sm cursor-pointer pl-5 sticky top-0 bg-secondary xs:bg-white z-50">
      <div className="flex items-center">
        {breadCrumb.length === 1 && getCategoryShow?.parentId ? (
          <>
            <Button
              placeholder="button"
              className="bg-transparent h-5 w-5 p-0"
              onClick={() => {
                setCategoryShow(null);
                setCategory(null);
                setBulkItems([]);
                setBreadCrumb([]);
              }}
            >
              <BreadcrumbIcon className="h-4 w-4 fill-icon-hover" />
            </Button>
            <div className="flex">
              <Button
                placeholder="button"
                className="block cursor-pointer text-secondary bg-transparent h-5 w-5 p-0"
                onClick={() => {
                  setCategoryShow(null);
                  setBulkItems([]);
                }}
              >
                ...
              </Button>
              <div className="w-[14px] h-6 flex justify-center items-center">
                <ChevronLeftIcon className="w-[5px] h-4 stroke-icon-hover" />
              </div>
            </div>
          </>
        ) : null}
        {breadCrumb.length > 0 ? (
          <div className="flex w-full justify-center items-center flex-wrap ">
            <Button
              placeholder="button"
              className="bg-transparent h-5 w-5 p-0"
              onClick={() => {
                setCategoryShow(null);
                setCategory(null);
                setBulkItems([]);
                setBreadCrumb([]);
              }}
            >
              <BreadcrumbIcon className="h-4 w-4 fill-icon-hover" />
            </Button>
            {breadCrumb.map((breadItem, index) => {
              return (
                <div className="flex items-center" key={breadItem.id}>
                  <Button
                    placeholder="button"
                    className="block !px-2 !py-[2px] bg-transparent cursor-pointer"
                    onClick={() => {
                      setCategoryShow(breadItem);
                      setCategory(breadItem);
                      if (breadItem.id !== getCategoryShow?.id) {
                        setBulkItems([]);
                      }
                    }}
                  >
                    <Typography
                      className={`caption_c1 ${breadItem.id === getCategoryShow?.id ? "text-primary" : "text-secondary"} lowercase`}
                    >
                      {breadItem.name}
                    </Typography>
                  </Button>
                  {index + 1 < breadCrumb.length && (
                    <div className="w-[14px] h-6 flex justify-center items-center">
                      <ChevronLeftIcon className="w-[5px] h-4 stroke-icon-hover" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryBreadCrumb;
