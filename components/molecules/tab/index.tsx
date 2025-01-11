import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

import React from "react";

interface IProps {
  tabList: { tabTitle: string; tabContent: React.ReactNode }[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const TabComponent = ({ tabList, activeTab, setActiveTab, className }: IProps) => {
  return (
    <Tabs value={activeTab} className="h-full">
      <TabsHeader
        className="flex items-center p-[2px] rounded-lg bg-secondary"
        indicatorProps={{ className: "" }}
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
              className="flex font-iranYekan h-9 p-2 text-secondary text-[12px] leading-[18px] -tracking-[0.12px] font-medium "
              placeholder="tab"
              activeClassName="!text-primary p-2 rounded-lg shadow-small"
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody placeholder="tab-body" className="h-[calc(100%-40px)]">
        {tabList.map((tab) => {
          return (
            <TabPanel
              key={tab.tabTitle}
              value={tab.tabTitle}
              className={`p-0 h-full ${className || ""}`}
            >
              {tab.tabContent}
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
};

export default TabComponent;
