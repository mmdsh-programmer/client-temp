"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full" dir="rtl">
      <TabsList className={cn("w-full rounded-lg bg-gray-200 h-full", headerClassName)} dir="rtl">
        {tabList.map((tab) => {
          return (
            <TabsTrigger
              key={tab.tabTitle}
              value={tab.tabTitle}
              className={cn(
                "p-2 text-[12px] font-medium text-secondary w-full",
                "data-[state=active]:bg-background data-[state=active]:!text-primary_normal data-[state=active]:shadow-small",
                tabClassName,
                activeTabClassName,
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
            className={cn(tabContentClassName)}
            dir="rtl"
          >
            {tab.tabContent}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default TabComponent;
