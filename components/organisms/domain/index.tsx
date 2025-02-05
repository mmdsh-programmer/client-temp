import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import { Typography } from "@material-tailwind/react";
import DomainFeeds from "../domainFeeds";

export enum ETabs {
  SETTING = "تنطیمات",
  FEEDS = "خبرنامه‌ها",
  COMMENTS = "نظرات",
  QUESTIONS = "سوالات",
  VIOLATION_REPORT = "گزارش تخلف",
  TAGS = "تگ‌ها",
}

const DomainConfig = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.SETTING);

  const tabList = [
    {
      tabTitle: ETabs.SETTING,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
    {
      tabTitle: ETabs.FEEDS,
      tabContent: <DomainFeeds />,
    },
    {
      tabTitle: ETabs.COMMENTS,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
    {
      tabTitle: ETabs.QUESTIONS,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
    {
      tabTitle: ETabs.VIOLATION_REPORT,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
    {
      tabTitle: ETabs.TAGS,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
  ];

  return (
    <TabComponent
      tabList={tabList}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      headerClassName="!bg-white !py-0 border-b-normal !border-b-2 rounded-none"
      activeTabClassName="!rounded-none !border-t-0 border-x-0 border-b-purple-normal !border-b-2 !shadow-none !text-purple-normal !py-3"
      tabClassName="!border-none !h-auto !py-3 !px-4"
    />
  );
};

export default DomainConfig;
