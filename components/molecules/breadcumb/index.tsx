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
  }, [getRepo, getRepoGroup]);

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
        <div className="flex items-center">
          <div className="flex items-center">
            <Typography className="text-xs xs:text-sm font-iranYekan mx-2 text-secondary">
              ...
            </Typography>
            <div className="h-6 w-[14px] flex items-center justify-center">
              <ChevronLeftIcon className="w-3 h-3 stroke-gray-500" />
            </div>
          </div>
          {list.slice(-2).map((breadcrumbItem, index) => {
            const realIndex = list.length - 2 + index;
            return (
              <div key={breadcrumbItem} className="flex items-center">
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
                      className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap
                    ${realIndex === list.length - 1 ? "text-primary" : "text-secondary"}`}
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
        </div>
      );
    }

    return (
      <div className="flex items-center">
        {list.map((breadcrumbItem, index) => {
          return (
            <div key={breadcrumbItem} className="flex items-center">
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
                    className={`text-xs xs:text-sm font-iranYekan mx-2 lowercase truncate whitespace-nowrap
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
