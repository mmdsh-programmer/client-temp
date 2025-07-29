import React, { useState } from "react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import DomainPublishedRepositories from "./domainPublishedRepositories";
import DomainSubscription from "./domainSubscription";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import PrivateFeedCreateDialog from "../dialogs/privateFeed/privateFeedCreateDialog";

export enum ETabs {
  REQUESTS = "درخواست‌ها",
  FEEDS = "لیست خبرنامه‌ها",
}

const PrivateFeed = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.REQUESTS);
  const [openCreateFeedDialog, setOpenCreateFeedDialog] = useState(false);

  const tabList = [
    {
      tabTitle: ETabs.REQUESTS,
      tabContent: activeTab === ETabs.REQUESTS ? <DomainSubscription /> : null,
    },
    {
      tabTitle: ETabs.FEEDS,
      tabContent: activeTab === ETabs.FEEDS ? <DomainPublishedRepositories /> : null,
    },
  ];

  return (
    <div className="flex h-full flex-col px-5 pb-4">
      <Tabs value={activeTab} className="h-full">
        <div className="flex h-[76px] min-h-[76px] items-center justify-between">
          <TabsHeader
            className="flex w-[210px] items-center overflow-x-auto rounded-lg bg-secondary p-[2px] text-secondary"
            indicatorProps={{
              className: "p-2 rounded-lg shadow-small !text-purple-normal",
            }}
            placeholder="tabs-header"
          >
            {tabList.map((tab) => {
              return (
                <Tab
                  key={tab.tabTitle}
                  value={tab.tabTitle}
                  onClick={() => {
                    return setActiveTab(tab.tabTitle);
                  }}
                  className="flex h-9 text-nowrap p-2 font-iranYekan text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-secondary"
                  placeholder="tab"
                  activeClassName="text-primary_normal "
                >
                  {tab.tabTitle}
                </Tab>
              );
            })}
          </TabsHeader>
          <IconTextButton
            text="ایجاد خبرنامه جدید"
            icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
            classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
            classNameButton=" rounded-lg h-9 !px-[6px] !bg-primary-normal"
            onClick={() => {
              return setOpenCreateFeedDialog(true);
            }}
          />
        </div>
        <TabsBody placeholder="tab-body" className="h-[calc(100%-80px)]">
          {tabList.map((tab) => {
            return (
              <TabPanel key={tab.tabTitle} value={tab.tabTitle} className="h-full p-0 overflow-auto">
                {tab.tabContent}
              </TabPanel>
            );
          })}
        </TabsBody>
      </Tabs>
      {openCreateFeedDialog ? <PrivateFeedCreateDialog setOpen={setOpenCreateFeedDialog} /> : null}
    </div>
  );
};

export default PrivateFeed;
