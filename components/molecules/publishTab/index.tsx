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
}

const PublishTab = ({
  tabList,
  activeTab,
  setActiveTab,
  tabHeaderClassName,
}: IProps) => {
  return (
    <Tabs value={activeTab} className="w-full">
      <TabsHeader
        className={`rounded-none border-b-2 border-blue-gray-50 bg-transparent p-0 ${tabHeaderClassName}`}
        indicatorProps={{
          className:
            "bg-transparent border-b-[3px] rounded-t-sm border-purp shadow-none rounded-none border-purple-normal",
        }}
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
            >
              {tab.tabTitle}
            </Tab>
          );
        })}
      </TabsHeader>
      <TabsBody placeholder="tab-body">
        {tabList.map((tab) => {
          return (
            <TabPanel
              className="px-0 py-0 min-h-[500px]"
              key={tab.tabTitle}
              value={tab.tabTitle}
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
