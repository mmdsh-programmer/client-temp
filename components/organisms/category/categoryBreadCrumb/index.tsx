import React, { useEffect, useState } from "react";
import ButtonAtom from "@components/atoms/button";
import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import { bulkItems } from "atom/bulk";
import { category, categoryShow } from "atom/category";
import { useRecoilState, useSetRecoilState } from "recoil";
import Text from "@components/atoms/typograghy/text";

const CategoryBreadCrumb = () => {
  const setCategory = useSetRecoilState(category);
  const [getCategoryShow, setCategoryShow] = useRecoilState(categoryShow);
  const setBulkItems = useSetRecoilState(bulkItems);

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
        breadCrumb.length - selectedCategoryIndex + 1
      );
      setBreadCrumb(breadCrumbTemp);
    }
  }, [getCategoryShow]);

  return (
    <div className="category-breadcrumb py-4 flex text-sm font-yekan-regular text-base-200 cursor-pointer pl-5 sticky top-0 bg-secondary xs:bg-white z-50">
      <div className="flex items-center">
        {breadCrumb.length === 1 && getCategoryShow?.parentId ? (
          <>
            <ButtonAtom
              className="bg-transparent h-5 w-5"
              onClick={() => {
                setCategoryShow(null);
                setCategory(null);
                setBulkItems([]);
                setBreadCrumb([]);
              }}
            >
              <BreadcrumbIcon className="h-4 w-4 fill-icon-hover" />
            </ButtonAtom>
            <div className="flex">
              <ButtonAtom
                className="block cursor-pointer text-secondary bg-transparent h-5 w-5 "
                onClick={() => {
                  setCategoryShow(null);
                  setBulkItems([]);
                }}
              >
                ...
              </ButtonAtom>
              <div className="w-[14px] h-6 flex justify-center items-center">
                <ChevronLeftIcon className="w-[5px] h-4 stroke-icon-hover" />
              </div>
            </div>
          </>
        ) : null}
        {breadCrumb.length > 0 ? (
          <div className="flex w-full justify-center items-center flex-wrap ">
            <ButtonAtom
              className="bg-transparent h-5 w-5"
              onClick={() => {
                setCategoryShow(null);
                setCategory(null);
                setBulkItems([]);
                setBreadCrumb([]);
              }}
            >
              <BreadcrumbIcon className="h-4 w-4 fill-icon-hover" />
            </ButtonAtom>
            {breadCrumb.map((breadItem, index) => {
              return (
                <div className="flex items-center" key={breadItem.id}>
                  <ButtonAtom
                    className="block !px-2 !py-[2px] bg-transparent cursor-pointer"
                    onClick={() => {
                      setCategoryShow(breadItem);
                      setCategory(breadItem);
                      if (breadItem.id !== getCategoryShow?.id) {
                        setBulkItems([]);
                      }
                    }}
                  >
                    <Text
                      className={`${breadItem.id === getCategoryShow?.id ? "text-primary" : "text-secondary"}  font-normal text-[12px] leading-5 -tracking-[0.12px] lowercase`}
                    >
                      {breadItem.name}
                    </Text>
                  </ButtonAtom>
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
