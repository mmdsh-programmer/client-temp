import React, { useState } from "react";

import DomainParticipant from "../domainParticipant";
import DomainPrivateFeed from "../domainFeeds/domainPrivateFeed";
import DomainPublicFeed from "../domainFeeds/domainPublicFeed";
import TabComponent from "@components/molecules/tab";
import { Typography } from "@material-tailwind/react";
import useGetUser from "@hooks/auth/useGetUser";

export enum ETabs {
  SETTING = "تنظیمات",
  PARTICIPANT = "دسترسی افراد",
  PUBLIC_FEEDS = "خبرنامه‌ عمومی",
  PRIVATE_FEEDS = "خبرنامه‌ خصوصی",
  COMMENTS = "نظرات",
  QUESTIONS = "سوالات",
  VIOLATION_REPORT = "گزارش تخلف",
  TAGS = "تگ‌ها",
}

const DomainConfig = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.SETTING);

  const { data: userInfo } = useGetUser();

  const tabList = [
    {
      tabTitle: ETabs.SETTING,
      tabContent: (
        <div className="flex justify-center items-center h-full w-full">
          <Typography>اطلاعاتی در دست نیست</Typography>
        </div>
      ),
    },
    userInfo?.domainRole === "owner"
      ? {
          tabTitle: ETabs.PARTICIPANT,
          tabContent: <DomainParticipant />,
        }
      : null,
    {
      tabTitle: ETabs.PUBLIC_FEEDS,
      tabContent: <DomainPublicFeed />,
    },
    {
      tabTitle: ETabs.PRIVATE_FEEDS,
      tabContent: <DomainPrivateFeed />,
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
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];

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
