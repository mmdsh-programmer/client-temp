import React from "react";

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

interface IProps {
  tabList: { tabTitle: string; tabContent: React.ReactNode }[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  headerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  tabContentClassName?: string;
  tabPanelClassName?: string;
}

const TabComponent = ({
  tabList,
  activeTab,
  setActiveTab,
  headerClassName,
  tabClassName,
  activeTabClassName,
  tabContentClassName,
  tabPanelClassName,
}: IProps) => {

  return (
    <Tabs value={activeTab} className="h-full">
      <TabsHeader
        className={`flex overflow-x-auto items-center p-[2px] bg-secondary rounded-lg bg text-secondary ${headerClassName || ""}`}
        indicatorProps={{
          className: `p-2 rounded-lg shadow-small !text-purple-normal ${activeTabClassName || ""}`,
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
                ${tabClassName || ""}
                leading-[18px] -tracking-[0.12px] font-medium text-nowrap`}
              placeholder="tab"
              activeClassName={`!text-primary_normal ${activeTabClassName || ""} `}
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody placeholder="tab-body" className={`h-[calc(100%-40px)] ${tabContentClassName || ""}`}>
        {tabList.map((tab) => {
          return (
            <TabPanel
              key={tab.tabTitle}
              value={tab.tabTitle}
              className={`p-0 h-full ${tabPanelClassName || ""}`}
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
