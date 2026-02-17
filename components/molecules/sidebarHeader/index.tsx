import React from "react";
import Link from "next/link";
import { Card } from "@components/ui/card";
import { ICustomPostData } from "@interface/app.interface";
import { InfoIcon } from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";

interface IProps {
  domainInfo: ICustomPostData;
}
const SidebarHeader = ({ domainInfo }: IProps) => {

  return (
    <Link href="/" className="w-full">
      <Card className="sidebar-header shadow-none px-3 py-2 text-primary_normal bg-primary-light rounded-md cursor-pointer hover:bg-primary-light w-full border-[1px] border-gray-200">
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
            <div className="font-iranYekan font-medium text-[13px] group">
              {domainInfo?.projectName ?? "نام پروژه"}
            </div>
            <div className="font-iranYekan text-hint text-xs">
              {domainInfo?.projectDescription ?? "توضیحات پروژه"}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SidebarHeader;
