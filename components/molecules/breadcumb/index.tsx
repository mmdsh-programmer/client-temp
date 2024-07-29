"use client";

import React from "react";
import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoAtom, repoGrouping } from "@atom/repository";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@material-tailwind/react";

const Breadcrumb = () => {
  const getRepoGroup = useRecoilValue(repoGrouping);
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const router = useRouter();

  const breadcrumbList = getRepo
    ? [getRepoGroup, getRepo.name]
    : [getRepoGroup];

  return (
    <>
      <div className="clasor-breadcrumb flex justify-center items-center bg-transparent">
        <BreadcrumbIcon className="h-4 w-3 fill-gray-400" />
      </div>
      <div>
        <Button
          placeholder="breadcrumb-button"
          className="border-none outline-none bg-transparent !shadow-none p-0 mx-2"
        >
          <Typography
            placeholder=""
            className="text-xs xs:text-sm font-iranYekan mx-2 text-secondary cursor-pointer "
          >
            کلاسور
          </Typography>
        </Button>
      </div>
      <div className="h-4 w-4">
        <ChevronLeftIcon className="w-3 h-3 stroke-gray-500 mt-[4px] mr-1" />
      </div>
      {breadcrumbList.map((breadcrumbItem, index) => {
        return (
          <div
            key={index}
            className={`${index === 1 ? "block xs:hidden sm:!block md:!hidden lg:!block " : ""}`}
          >
            <Button
              placeholder="breadcrumb-button"
              className="border-none !shadow-none outline-none bg-transparent p-0 "
              onClick={() => {
                if (index === 0) {
                  router.push("/admin/dashboard");
                }
              }}
            >
              <div className="flex">
                <Typography
                  placeholder={breadcrumbItem}
                  className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap
                  ${index === breadcrumbList.length - 1 ? "text-primary" : "text-secondary"}`}
                >
                  {breadcrumbItem}
                </Typography>
                {index !== breadcrumbList.length - 1 ? (
                  <div className="h-4 w-4">
                    <ChevronLeftIcon className="w-3 h-3 stroke-gray-500 mt-[4px] mr-1" />
                  </div>
                ) : null}
              </div>
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default Breadcrumb;
