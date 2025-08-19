import React, { useEffect, useState } from "react";
import { BackIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import { ICategoryMetadata } from "@interface/category.interface";
import { useCategoryStore } from "@store/category";

const MoveBreadCrumb = () => {
  const [getCategoryMoveDest, setCategoryMoveDest] = useCategoryStore((state) => {
    return [state.categoryMoveDest, state.setCategoryMoveDest];
  });
  const [breadCrumb, setBreadCrumb] = useState<ICategoryMetadata[]>([]);

  useEffect(() => {
    const existInBreadCrumb = breadCrumb?.filter((breadItem) => {
      return breadItem.id === getCategoryMoveDest?.id;
    });
    if (!existInBreadCrumb?.length && getCategoryMoveDest) {
      setBreadCrumb([...breadCrumb, getCategoryMoveDest]);
    } else if (existInBreadCrumb?.length && getCategoryMoveDest) {
      const selectedCategoryIndex = breadCrumb.findIndex((breadItem) => {
        return breadItem.id === getCategoryMoveDest.id;
      });
      const breadCrumbTemp = [...breadCrumb];
      breadCrumbTemp.splice(
        selectedCategoryIndex + 1,
        breadCrumb.length - selectedCategoryIndex + 1,
      );
      setBreadCrumb(breadCrumbTemp);
    }
  }, [getCategoryMoveDest]);

  return (
    <div className="move-breadcrumb sticky top-0 z-50 cursor-pointer bg-white px-2 py-2 text-sm">
      {breadCrumb.length > 0 ? (
        <div className="flex w-full flex-wrap items-center">
          <Button
            placeholder="button"
            className="h-5 w-5 bg-transparent p-0"
            onClick={() => {
              setCategoryMoveDest(null);
              setBreadCrumb([]);
            }}
          >
            <BackIcon className="h-4 w-4 fill-icon-hover" />
          </Button>
          {breadCrumb.map((breadItem, index) => {
            return (
              <div className="flex items-center" key={breadItem.id}>
                <Button
                  placeholder="button"
                  className="block cursor-pointer bg-transparent !px-2 !py-[2px] lowercase"
                  onClick={() => {
                    setCategoryMoveDest(breadItem);
                  }}
                >
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {breadCrumb.length > 2 ? (
                    index === 0 || index === breadCrumb.length - 1 ? (
                      <Typography className="caption_c1 text-primary_normal">
                        {breadItem.name}
                      </Typography>
                    ) : (
                      (index !== 0 || index !== breadCrumb.length - 1) && (
                        <Typography className="caption_c1 text-primary_normal">...</Typography>
                      )
                    )
                  ) : (
                    <Typography className="caption_c1 text-primary_normal">
                      {breadItem.name}
                    </Typography>
                  )}
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
  );
};

export default MoveBreadCrumb;
