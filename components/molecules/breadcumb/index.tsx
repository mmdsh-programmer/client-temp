import React, { useEffect } from "react";
import { BreadcrumbIcon, ChevronLeftIcon } from "@components/atoms/icons";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { useRepositoryStore } from "@store/repository";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRouter } from "next/navigation";
import { cn } from "@utils/cn";

const Breadcrumb = () => {
  const { repoGrouping, repo } = useRepositoryStore();
  const { sidebarSection } = useSidebarStore();
  const router = useRouter();

  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLOListElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const isOverflowing = contentRef.current.scrollWidth > containerRef.current.clientWidth;
        setShouldAnimate(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [repo, repoGrouping, sidebarSection]);

  const getBreadcrumbList = () => {
    const baseBreadcrumb = ["کلاسور"];
    const personalDocuments = "اسناد شخصی";

    if (repo) return [...baseBreadcrumb, repoGrouping, repo.name];
    if (repoGrouping) return [...baseBreadcrumb, repoGrouping];

    switch (sidebarSection) {
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

  const list = getBreadcrumbList();
  const isTruncated = list.length > 3;
  const displayList = isTruncated ? list.slice(-2) : list;

  return (
    <>
      <div className="clasor-breadcrumb flex items-center justify-center bg-transparent">
        <BreadcrumbIcon className="h-5 w-5 fill-gray-400" />
      </div>

      <div ref={containerRef} className="relative max-w-full flex-1 overflow-hidden xs:max-w-[70%]">
        <BreadcrumbRoot>
          <BreadcrumbList
            ref={contentRef}
            className={cn(
              "flex-nowrap whitespace-nowrap sm:gap-0", // Override wrapping for marquee effect
              shouldAnimate ? "animate-marquee" : "",
            )}
          >
            {isTruncated && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </BreadcrumbItem>
                <BreadcrumbSeparator className="flex h-6 w-[14px] items-center justify-center opacity-100">
                  <ChevronLeftIcon className="h-3 w-3 stroke-gray-500" />
                </BreadcrumbSeparator>
              </>
            )}

            {displayList.map((item, index) => {
              const isLast = index === displayList.length - 1;
              const originalIndex = isTruncated ? list.length - 2 + index : index;
              const uniqueKey = `breadcrumb-${String(item).replace(/\s+/g, "-")}`;

              return (
                <React.Fragment key={uniqueKey}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className="mx-2 truncate whitespace-nowrap font-iranYekan text-xs lowercase text-primary_normal xs:text-sm"
                        title={String(item)}
                      >
                        {item}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        asChild
                        className="hover:text-link/80 mx-2 cursor-pointer truncate whitespace-nowrap font-iranYekan text-xs lowercase text-link xs:text-sm"
                        onClick={() => {
                          if (originalIndex === 1) {
                            router.push("/admin/dashboard");
                          }
                        }}
                      >
                        <span title={String(item)}>{item}</span>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && (
                    <BreadcrumbSeparator className="flex h-6 w-[14px] items-center justify-center opacity-100">
                      <ChevronLeftIcon className="h-3 w-3 stroke-gray-500" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </BreadcrumbRoot>
      </div>
    </>
  );
};

export default Breadcrumb;
