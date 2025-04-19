import React, { useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

import { AddIcon } from "@components/atoms/icons";
import DomainPrivateFeedList from "./domainPrivateFeedList";
import DomainSubscription from "./domainSubscription";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import PrivateFeedCreateDialog from "../dialogs/privateFeed/privateFeedCreateDialog";

export enum ETabs {
  REQUESTS = "درخواست‌ها",
  FEEDS = "لیست خبرنامه‌ها",
}

const DomainPrivateFeed = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.REQUESTS);
  const [openCreateFeedDialog, setOpenCreateFeedDialog] = useState(false);

  const tabList = [
    {
      tabTitle: ETabs.REQUESTS,
      tabContent: <DomainSubscription />,
    },
    {
      tabTitle: ETabs.FEEDS,
      tabContent: <DomainPrivateFeedList />,
    },
  ];

  return (
    <div className="flex flex-col h-full pb-4 px-5">
      <Tabs value={activeTab} className="h-full">
        <div className="h-[76px] min-h-[76px] flex justify-between items-center">
          <TabsHeader
            className="flex items-center p-[2px] rounded-lg bg-secondary text-secondary "
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
                  className={`flex font-iranYekan h-9 p-2 text-secondary text-[12px]
                leading-[18px] -tracking-[0.12px] font-medium text-nowrap`}
                  placeholder="tab"
                  activeClassName="text-primary  "
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
            classNameButton=" rounded-lg h-9 !px-[6px] bg-secondary "
            onClick={() => {
              return setOpenCreateFeedDialog(true);
            }}
          />
        </div>
        <TabsBody placeholder="tab-body" className="h-[calc(100%-40px)]">
          {tabList.map((tab) => {
            return (
              <TabPanel
                key={tab.tabTitle}
                value={tab.tabTitle}
                className="p-0 h-full"
              >
                {tab.tabContent}
              </TabPanel>
            );
          })}
        </TabsBody>
      </Tabs>
      {openCreateFeedDialog ? (
        <PrivateFeedCreateDialog setOpen={setOpenCreateFeedDialog} />
      ) : null}
    </div>
  );
};

export default DomainPrivateFeed;
