import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { LogoIcon } from "../../atoms/icons";

const SidebarHeader = () => {
  return (
    <Card
      placeholder="sidebar-header"
      className="shadow-none px-3 py-2 rounded-md bg-tertiary w-full border-[1px] border-gray-200"
    >
      <div className="flex items-center">
        <LogoIcon className="h-8 w-8" />
        <div className="flex flex-col mr-2">
          <Typography
            placeholder=""
            className="font-iranYekan text-primary font-medium text-[13px]"
          >
            کلاسور
          </Typography>
          <Typography
            placeholder=""
            className="font-iranYekan text-hint text-xs"
          >
            clasor.pod.ir
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default SidebarHeader;
