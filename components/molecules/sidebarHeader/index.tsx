import { Card, Typography } from "@material-tailwind/react";

import { ICustomPostData } from "@interface/app.interface";
import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import React from "react";

interface IProps {
  domainInfo: ICustomPostData;
}
const SidebarHeader = ({ domainInfo }: IProps) => {

  return (
    <Card
      placeholder="sidebar-header"
      className="sidebar-header shadow-none px-3 py-2 rounded-md bg-tertiary w-full border-[1px] border-gray-200"
    >
      <div className="flex items-center">
        {domainInfo?.logo ? (
          <ImageComponent
            className="h-8 w-8"
            width={32}
            height={32}
            alt="project-logo"
            src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${domainInfo?.logo}?&time=${Date.now()})`}
          />
        ) : (
          <InfoIcon stroke="#000" className="h-8 w-8" />
        )}
        <div className="flex flex-col mr-2">
          <Typography
            placeholder=""
            className="font-iranYekan text-primary font-medium text-[13px]"
          >
            {domainInfo?.projectName ?? "نام پروژه"}
          </Typography>
          <Typography
            placeholder=""
            className="font-iranYekan text-hint text-xs"
          >
            {domainInfo?.projectDescription ?? "توضیحات پروژه"}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default SidebarHeader;
