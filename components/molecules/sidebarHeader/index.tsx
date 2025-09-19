import { Card, Typography } from "@material-tailwind/react";

import { ICustomPostData } from "@interface/app.interface";
import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import Link from "next/link";
import React from "react";

interface IProps {
  domainInfo: ICustomPostData;
}
const SidebarHeader = ({ domainInfo }: IProps) => {

  return (
    <Link href="/" className="w-full">
      <Card
        placeholder="sidebar-header"
        className="sidebar-header shadow-none px-3 py-2 text-primary_normal bg-primary-light rounded-md cursor-pointer hover:bg-primary-light w-full border-[1px] border-gray-200"
        {...({} as  Omit<React.ComponentProps<typeof Card>, "placeholder">)}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 min-w-10 min-h-10 rounded-md p-1">
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
          </div>
          <div className="flex flex-col mr-2">
            <Typography
              placeholder=""
              className="font-iranYekan font-medium text-[13px] group"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {domainInfo?.projectName ?? "نام پروژه"}
            </Typography>
            <Typography
              placeholder=""
              className="font-iranYekan text-hint text-xs"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {domainInfo?.projectDescription ?? "توضیحات پروژه"}
            </Typography>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SidebarHeader;
