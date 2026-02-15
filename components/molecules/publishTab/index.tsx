"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";

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
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList
        className={cn(
          "inline-flex h-auto w-full rounded-none border-b-2 border-blue-gray-50 bg-transparent p-0",
          tabHeaderClassName
        )}
        dir="rtl"
      >
        {tabList.map((tab) => {
          return (
            <TabsTrigger
              key={tab.tabTitle}
              value={tab.tabTitle}
              className={cn(
                "w-fit rounded-none border-b-[3px] border-transparent bg-transparent font-iranYekan text-sm font-medium text-gray-500 shadow-none transition-none",
                "px-0 mx-4 py-4 data-[state=active]:border-purple-normal data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
              )}
            >
              {tab.tabTitle}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabList.map((tab) => {
        return (
          <TabsContent
            key={tab.tabTitle}
            value={tab.tabTitle}
            className={cn(tabPanelClassName)}
            dir="rtl"
          >
            {tab.tabContent}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default PublishTab;
