import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";

import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

const Breadcrumb = () => {
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const getRepo = useRecoilValue(repoAtom);
  const getSidebarSection = useRecoilValue(sidebarSectionAtom);

  const router = useRouter();

  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const isOverflowing =
          contentRef.current.scrollWidth > containerRef.current.clientWidth;
        setShouldAnimate(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      return window.removeEventListener("resize", checkOverflow);
    };
  }, [getRepo, getRepoGroup, getSidebarSection]);

  const breadcrumbList = () => {
    const baseBreadcrumb = ["کلاسور"];
    const personalDocuments = "اسناد شخصی";

    // Handle repository-related breadcrumbs
    if (getRepo) {
      return [...baseBreadcrumb, getRepoGroup, getRepo.name];
    }
    
    if (getRepoGroup) {
      return [...baseBreadcrumb, getRepoGroup];
    }

    // Handle other sidebar sections
    switch (getSidebarSection) {
      case ESidebarSection.DASHBOARD:
        return [...baseBreadcrumb, ESidebarSection.DASHBOARD];
      case ESidebarSection.MY_DOCUMENTS:
        return [...baseBreadcrumb, personalDocuments, ESidebarSection.MY_DOCUMENTS];
      case ESidebarSection.SHARED_DOCUMENTS:
        return [...baseBreadcrumb, personalDocuments, ESidebarSection.SHARED_DOCUMENTS];
      case ESidebarSection.DOMAIN_MANAGEMENT:
        return [...baseBreadcrumb, ESidebarSection.DOMAIN_MANAGEMENT];
      case ESidebarSection.BRANCH_MANAGEMENT:
        return [...baseBreadcrumb, ESidebarSection.BRANCH_MANAGEMENT];
      default:
        return baseBreadcrumb;
    }
  };

  const renderBreadcrumbItems = () => {
    const list = breadcrumbList();

    if (list.length > 3) {
      return (
        <div className="breadcumb-list flex items-center">
          <div className="flex items-center">
            <Typography className="text-xs xs:text-sm font-iranYekan mx-2 text-link">
              ...
            </Typography>
            <div className="h-6 w-[14px] flex items-center justify-center">
              <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
            </div>
          </div>
          {list.slice(-2).map((breadcrumbItem) => {
            // Create a unique key based on the breadcrumb item
            const uniqueKey = `breadcrumb-${String(breadcrumbItem).replace(/\s+/g, "-")}`;
            const isLast = list.indexOf(breadcrumbItem) === list.length - 1;
            
            return (
              <div key={uniqueKey} className="flex items-center">
                <Button
                  className="border-none !shadow-none outline-none bg-transparent p-0"
                  onClick={() => {
                    if (list.indexOf(breadcrumbItem) === 1) {
                      router.push("/admin/dashboard");
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Typography
                      title={String(breadcrumbItem)}
                      className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap
                    ${isLast ? "text-primary_normal" : "text-link"}`}
                    >
                      {breadcrumbItem}
                    </Typography>
                    {!isLast && (
                      <div className="h-6 w-[14px] flex items-center justify-center">
                        <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex items-center">
        {list.map((breadcrumbItem) => {
          // Create a unique key based on the breadcrumb item
          const uniqueKey = `breadcrumb-${String(breadcrumbItem).replace(/\s+/g, "-")}`;
          const isLast = list.indexOf(breadcrumbItem) === list.length - 1;
          
          return (
            <div key={uniqueKey} className="flex items-center">
              <Button
                className="border-none !shadow-none outline-none bg-transparent p-0"
                onClick={() => {
                  if (list.indexOf(breadcrumbItem) === 1) {
                    router.push("/admin/dashboard");
                  }
                }}
              >
                <div className="flex items-center">
                  <Typography
                    title={String(breadcrumbItem)}
                    className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap
                    ${isLast ? "text-primary_normal" : "text-link"}`}
                  >
                    {breadcrumbItem}
                  </Typography>
                  {!isLast && (
                    <div className="h-6 w-[14px] flex items-center justify-center">
                      <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
                    </div>
                  )}
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="clasor-breadcrumb flex justify-center items-center bg-transparent">
        <BreadcrumbIcon className="h-5 w-5 fill-gray-400" />
      </div>
      <div ref={containerRef} className="relative overflow-hidden flex-1 xs:max-w-[70%] max-w-full">
        <div
          ref={contentRef}
          className={`whitespace-nowrap ${
            shouldAnimate ? "animate-marquee" : ""
          }`}
        >
          {renderBreadcrumbItems()}
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
