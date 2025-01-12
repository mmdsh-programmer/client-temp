import React from "react";
import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

const Breadcrumb = () => {
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const getRepo = useRecoilValue(repoAtom);

  const router = useRouter();

  const breadcrumbList = () => {
    const baseBreadcrumb = ["کلاسور"];

    if (getRepo) {
      return [...baseBreadcrumb, getRepoGroup, getRepo.name];
    }
    return [...baseBreadcrumb, getRepoGroup];
  };

  const renderBreadcrumbItems = () => {
    const list = breadcrumbList();

    if (list.length > 3) {
      return (
        <>
          <div className="flex items-center">
            <Typography className="text-xs xs:text-sm font-iranYekan mx-2 text-secondary">
              ...
            </Typography>
            <div className="h-6 w-[14px] flex items-center justify-center">
              <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
            </div>
          </div>
          {list.slice(-2).map((breadcrumbItem , index) => {
            const realIndex = list.length - 2 + index;
            return (
              <div key={breadcrumbItem}>
                <Button
                  className="border-none !shadow-none outline-none bg-transparent p-0"
                  onClick={() => {
                    if (realIndex === 1) {
                      router.push("/admin/dashboard");
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Typography
                      title={breadcrumbItem as string}
                      className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap max-w-[80px]
                      ${
                        realIndex === list.length - 1
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    >
                      {breadcrumbItem}
                    </Typography>
                    {realIndex !== list.length - 1 && (
                      <div className="h-6 w-[14px] flex items-center justify-center">
                        <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            );
          })}
        </>
      );
    }

    return list.map((breadcrumbItem, index) => {
      return (
        <div key={breadcrumbItem}>
          <Button
            className="border-none !shadow-none outline-none bg-transparent p-0"
            onClick={() => {
              if (index === 1) {
                router.push("/admin/dashboard");
              }
            }}
          >
            <div className="flex items-center">
              <Typography
                title={breadcrumbItem as string}
                className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap max-w-[80px]
              ${index === list.length - 1 ? "text-primary" : "text-secondary"}`}
              >
                {breadcrumbItem}
              </Typography>
              {index !== list.length - 1 && (
                <div className="h-6 w-[14px] flex items-center justify-center">
                  <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
                </div>
              )}
            </div>
          </Button>
        </div>
      );
    });
  };

  return (
    <>
      <div className="clasor-breadcrumb flex justify-center items-center bg-transparent">
        <BreadcrumbIcon className="h-5 w-5 fill-gray-400" />
      </div>
      {renderBreadcrumbItems()}
    </>
  );
};

export default Breadcrumb;
