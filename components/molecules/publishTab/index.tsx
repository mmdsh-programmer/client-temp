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
  tabHeaderClassName?: string;
  tabPanelClassName?: string;
}

const PublishTab = ({
  tabList,
  activeTab,
  setActiveTab,
  tabHeaderClassName,
  tabPanelClassName,
}: IProps) => {
  return (
    <Tabs value={activeTab} className="w-full" {...({} as  React.ComponentProps<typeof Tabs>)}>
      <TabsHeader
        className={`rounded-none border-b-2 border-blue-gray-50 bg-transparent p-0 ${tabHeaderClassName}`}
        indicatorProps={{
          className:
            "bg-transparent border-b-[3px] rounded-t-sm border-purp shadow-none rounded-none border-purple-normal",
        }}
        {...({} as  React.ComponentProps<typeof TabsHeader>)}
      >
        {tabList.map((tab) => {
          return (
            <Tab
              key={tab.tabTitle}
              value={tab.tabTitle}
              onClick={() => {
                return setActiveTab(tab.tabTitle);
              }}
              className={`w-fit font-iranYekan text-sm px-0 mx-4 py-4 ${tab.tabTitle === activeTab ? "text-gray-800" : "text-gray-500"}`}
              {...({} as  Omit<React.ComponentProps<typeof Tab>, "value">)}
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody placeholder="tab-body" {...({} as  Omit<React.ComponentProps<typeof TabsBody>, "placeholder">)}>
        {tabList.map((tab) => {
          return (
            <TabPanel
              className={`px-0 py-0 min-h-[500px] ${tabPanelClassName || ""}`}
              key={tab.tabTitle}
              value={tab.tabTitle}
              {...({} as  Omit<React.ComponentProps<typeof TabPanel>, "value">)}
            >
              {tab.tabTitle === activeTab ? tab.tabContent : null}
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
};

export default PublishTab;
