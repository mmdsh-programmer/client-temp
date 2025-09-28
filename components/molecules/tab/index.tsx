import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";

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
    <Tabs
      {...({} as React.ComponentProps<typeof Tabs>)}
      value={activeTab}
      className="h-full overflow-visible px-1"
    >
      <TabsHeader
        className={`flex items-center overflow-x-auto rounded-lg bg-gray-200 p-[2px] ${headerClassName || ""}`}
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
              className={`flex h-9 p-2 font-iranYekan text-[12px] text-secondary ${tabClassName || ""} text-nowrap font-medium leading-[18px] -tracking-[0.12px]`}
              activeClassName={`!text-primary_normal ${activeTabClassName || ""} `}
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody
        {...({} as React.ComponentProps<typeof TabsBody>)}
        className={`h-[calc(100%-45px)] ${tabContentClassName || ""}`}
      >
        {tabList.map((tab) => {
          return (
            <TabPanel
              {...({} as React.ComponentProps<typeof TabPanel>)}
              key={tab.tabTitle}
              value={tab.tabTitle}
              className="h-full p-0"
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
