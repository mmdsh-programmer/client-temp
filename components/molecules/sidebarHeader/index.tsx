import React from "react";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import useGetTheme from "@hooks/theme/useGetTheme";

const SidebarHeader = () => {
  const { data: getThemeInfo, isFetching } = useGetTheme();

  if (isFetching) {
    return (
      <Card
        placeholder="sidebar-header"
        className="shadow-none px-3 py-2 rounded-md bg-tertiary w-full border-[1px] border-gray-200"
      >
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      </Card>
    );
  }

  if (getThemeInfo && "error" in getThemeInfo) {
    return <h1>خطا در دریافت اطلاعات پروژه</h1>;
  }

  return (
    <Card
      placeholder="sidebar-header"
      className="sidebar-header shadow-none px-3 py-2 rounded-md bg-tertiary w-full border-[1px] border-gray-200"
    >
      <div className="flex items-center">
        {getThemeInfo?.logo ? (
          <ImageComponent
            className="h-8 w-8"
            width={32}
            height={32}
            alt="project-logo"
            src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${getThemeInfo?.logo}?&time=${Date.now()})`}
          />
        ) : (
          <InfoIcon stroke="#000" className="h-8 w-8" />
        )}
        <div className="flex flex-col mr-2">
          <Typography
            placeholder=""
            className="font-iranYekan text-primary font-medium text-[13px]"
          >
            {getThemeInfo?.projectName ?? "نام پروژه"}
          </Typography>
          <Typography
            placeholder=""
            className="font-iranYekan text-hint text-xs"
          >
            {getThemeInfo?.projectDescription ?? "توضیحات پروژه"}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default SidebarHeader;
