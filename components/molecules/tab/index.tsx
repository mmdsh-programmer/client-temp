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
  headerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  tabContentClassName?: string;
}

const TabComponent = ({
  tabList,
  activeTab,
  setActiveTab,
  headerClassName,
  tabClassName,
  activeTabClassName,
  tabContentClassName,
}: IProps) => {
  return (
    <Tabs {...({} as React.ComponentProps<typeof Tabs>)} value={activeTab} className="h-full px-1">
      <TabsHeader
        className={`flex overflow-x-auto items-center p-[2px] bg-gray-200 rounded-lg ${headerClassName || ""}`}
        indicatorProps={{
          className: `p-2 rounded-lg shadow-small !text-purple-normal ${activeTabClassName || ""}`,
        }}
        {...({} as Omit<React.ComponentProps<typeof TabsHeader>, "indicatorProps">)}
      >
        {tabList.map((tab) => {
          return (
            <Tab
              {...({} as React.ComponentProps<typeof Tab>)}
              key={tab.tabTitle}
              value={tab.tabTitle}
              onClick={() => {
                return setActiveTab(tab.tabTitle);
              }}
              className={`flex font-iranYekan h-9 p-2 text-secondary text-[12px]
                ${tabClassName || ""}
                leading-[18px] -tracking-[0.12px] font-medium text-nowrap`}
              activeClassName={`!text-primary_normal ${activeTabClassName || ""} `}
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody {...({} as React.ComponentProps<typeof TabsBody>)} className={`h-[calc(100%-45px)] ${tabContentClassName || ""}`}>
        {tabList.map((tab) => {
          return (
            <TabPanel
              {...({} as React.ComponentProps<typeof TabPanel>)}
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
  );
};

export default TabComponent;
