import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { BackIcon } from "@components/atoms/icons";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import { categoryMoveDestAtom } from "atom/category";
import { useRecoilState } from "recoil";

const MoveBreadCrumb = () => {
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDestAtom);
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
        breadCrumb.length - selectedCategoryIndex + 1
      );
      setBreadCrumb(breadCrumbTemp);
    }
  }, [getCategoryMoveDest]);

  return (
    <div className="move-breadcrumb text-sm cursor-pointer px-2 py-2 sticky top-0 bg-white z-50">
      {breadCrumb.length > 0 ? (
        <div className="flex w-full items-center flex-wrap ">
          <Button
            placeholder="button"
            className="bg-transparent h-5 w-5 p-0"
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
                  className="block !px-2 !py-[2px] bg-transparent cursor-pointer lowercase"
                  onClick={() => {
                    setCategoryMoveDest(breadItem);
                  }}
                >
                  {breadCrumb.length > 2 ? (
                    index === 0 || index === breadCrumb.length - 1 ? (
                      <Typography className="caption_c1 text-primary">
                        {breadItem.name}
                      </Typography>
                    ) : (
                      (index !== 0 || index !== breadCrumb.length - 1) && (
                        <Typography className="caption_c1 text-primary">
                          ...
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography className="caption_c1 text-primary">
                      {breadItem.name}
                    </Typography>
                  )}
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
  );
};

export default MoveBreadCrumb;
