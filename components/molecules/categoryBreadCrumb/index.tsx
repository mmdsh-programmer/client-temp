import React, { useMemo, useRef } from "react";
import { BackIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { Button } from "@components/ui/button";
import { ICategoryMetadata } from "@interface/category.interface";
import { useCategoryStore } from "@store/category";
import { useBulkStore } from "@store/bulk";
import { useRepositoryStore } from "@store/repository";
import { usePathname } from "next/navigation";

const CategoryBreadCrumb = () => {
  const currentPath = usePathname();

  const { setRepositoryId } = useRepositoryStore();
  const { categoryShow: getCategoryShow, setCategoryShow, setCategory } = useCategoryStore();
  const { setBulkItems } = useBulkStore();
  const breadCrumbRef = useRef<ICategoryMetadata[]>([]);

  const breadCrumb = useMemo(() => {
    if (!getCategoryShow) return [];

    const existInBreadCrumb = breadCrumbRef.current.filter((breadItem) => {
      return breadItem.id === getCategoryShow.id;
    });

    if (!existInBreadCrumb.length) {
      const newBreadCrumb = [...breadCrumbRef.current, getCategoryShow];
      breadCrumbRef.current = newBreadCrumb;
      return newBreadCrumb;
    }

    const selectedCategoryIndex = breadCrumbRef.current.findIndex((breadItem) => {
      return breadItem.id === getCategoryShow.id;
    });
    const breadCrumbTemp = [...breadCrumbRef.current];
    breadCrumbTemp.splice(
      selectedCategoryIndex + 1,
      breadCrumbRef.current.length - selectedCategoryIndex + 1,
    );
    breadCrumbRef.current = breadCrumbTemp;
    return breadCrumbTemp;
  }, [getCategoryShow]);

  const clearBreadCrumb = () => {
    breadCrumbRef.current = [];
    setCategoryShow(null);
    setCategory(null);
    setBulkItems([]);
  };

  const handleBack = () => {
    if (breadCrumbRef.current.length > 1) {
      breadCrumbRef.current = breadCrumbRef.current.slice(0, -1);
      const prevCategory = breadCrumbRef.current[breadCrumbRef.current.length - 1];
      setCategoryShow(prevCategory);
      setCategory(prevCategory);
      setBulkItems([]);
    } else {
      clearBreadCrumb();
    }
    if (currentPath !== "/admin/repositories") {
      setRepositoryId(null);
    }
  };

  return (
    <div className="category-breadcrumb sticky top-0 z-20 flex cursor-pointer bg-secondary pl-5 text-sm xs:bg-white">
      <div className="flex items-center">
        {breadCrumb.length > 0 ? (
          <Button
            className="h-5 w-5 bg-transparent p-0"
            onClick={handleBack}
            variant="ghost"
            size="sm"
          >
            <BackIcon className="h-4 w-4 fill-icon-hover" />
          </Button>
        ) : null}
        {breadCrumb.length === 1 && getCategoryShow?.parentId ? (
          <div className="flex">
            <Button
              className="block h-5 w-5 cursor-pointer bg-transparent p-0 text-secondary"
              onClick={clearBreadCrumb}
              variant="ghost"
              size="sm"
            >
              ...
            </Button>
            <div className="flex h-6 w-[14px] items-center justify-center">
              <ChevronLeftIcon className="h-4 w-[5px] stroke-icon-hover" />
            </div>
          </div>
        ) : null}
        {breadCrumb.length > 0 ? (
          <div className="flex w-full flex-wrap items-center justify-center">
            {breadCrumb.map((breadItem, index) => {
              return (
                <div className="flex items-center" key={breadItem.id}>
                  <Button
                    className="block cursor-pointer bg-transparent !px-2 !py-[2px]"
                    onClick={() => {
                      setCategoryShow(breadItem);
                      setCategory(breadItem);
                      if (breadItem.id !== getCategoryShow?.id) {
                        setBulkItems([]);
                      }
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <span
                      className={`caption_c1 ${breadItem.id === getCategoryShow?.id ? "text-primary_normal" : "text-secondary"} lowercase`}
                    >
                      {breadItem.name}
                    </span>
                  </Button>
                  {index + 1 < breadCrumb.length && (
                    <div className="flex h-6 w-[14px] items-center justify-center">
                      <ChevronLeftIcon className="h-4 w-[5px] stroke-icon-hover" />
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
