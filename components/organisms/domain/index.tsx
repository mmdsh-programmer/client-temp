import React, { useState } from "react";
import DomainParticipant from "../domainParticipant";
import DomainPrivateFeed from "../domainFeeds/domainPrivateFeed";
import DomainPublicFeed from "../domainFeeds/domainPublicFeed";
import TabComponent from "@components/molecules/tab";
import { Typography } from "@material-tailwind/react";
import useGetUser from "@hooks/auth/useGetUser";
import DomainTags from "../domainTags";
import Settings from "../settings";

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
  const { data: userInfo } = useGetUser();

  const [activeTab, setActiveTab] = useState<string>(
    userInfo?.domainRole === "owner" || userInfo?.isClasorAdmin
      ? ETabs.SETTING
      : ETabs.PUBLIC_FEEDS,
  );

  const tabList = [
    userInfo?.domainRole === "owner" || userInfo?.isClasorAdmin
      ? {
          tabTitle: ETabs.SETTING,
          tabContent: activeTab === ETabs.SETTING ? <Settings /> : null,
        }
      : null,
    userInfo?.domainRole === "owner" || userInfo?.isClasorAdmin
      ? {
          tabTitle: ETabs.PARTICIPANT,
          tabContent: activeTab === ETabs.PARTICIPANT ? <DomainParticipant /> : null,
        }
      : null,
    {
      tabTitle: ETabs.PUBLIC_FEEDS,
      tabContent: activeTab === ETabs.PUBLIC_FEEDS ? <DomainPublicFeed /> : null,
    },
    {
      tabTitle: ETabs.PRIVATE_FEEDS,
      tabContent: activeTab === ETabs.PRIVATE_FEEDS ? <DomainPrivateFeed /> : null,
    },
    {
      tabTitle: ETabs.COMMENTS,
      tabContent:
        activeTab === ETabs.COMMENTS ? (
          <div className="flex h-full w-full items-center justify-center">
            <Typography>اطلاعاتی در دست نیست</Typography>
          </div>
        ) : null,
    },
    {
      tabTitle: ETabs.QUESTIONS,
      tabContent:
        activeTab === ETabs.QUESTIONS ? (
          <div className="flex h-full w-full items-center justify-center">
            <Typography>اطلاعاتی در دست نیست</Typography>
          </div>
        ) : null,
    },
    {
      tabTitle: ETabs.VIOLATION_REPORT,
      tabContent:
        activeTab === ETabs.VIOLATION_REPORT ? (
          <div className="flex h-full w-full items-center justify-center">
            <Typography>اطلاعاتی در دست نیست</Typography>
          </div>
        ) : null,
    },
    userInfo?.domainConfig?.useDomainTag
      ? {
          tabTitle: ETabs.TAGS,
          tabContent: activeTab === ETabs.TAGS ? <DomainTags /> : null,
        }
      : null,
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
      tabContentClassName="overflow-auto !h-[calc(100%-60px)] xs:!h-[calc(100%-45px)]"
    />
  );
};

export default DomainConfig;
