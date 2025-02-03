import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import BranchUsers from "../branchUsers";
import BranchGroups from "../branchGroups";
import { useRecoilValue } from "recoil";
import { branchIdAtom } from "@atom/branch";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

export enum ETabs {
  SETTING = "تنظیمات",
  USERS = "دسترسی افراد",
  GROUPS = "گروه‌ها",
  FEEDS = "خبرنامه‌ها",
  COMMENTS = " نظرات",
  QUESTIONS = " سوالات",
  VIOLATION_REPORT = "گزارش تخلف",
  TAGS = " تگ‌ها",
}

const BranchInfo = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.SETTING);
  const getBranchId = useRecoilValue(branchIdAtom);

  const tabList = [
    {
      tabTitle: ETabs.SETTING,
      tabContent: <div>nothing</div>,
    },
    {
      tabTitle: ETabs.USERS,
      tabContent: <BranchUsers />,
    },
    {
      tabTitle: ETabs.GROUPS,
      tabContent: <BranchGroups />,
    },
    {
      tabTitle: ETabs.FEEDS,
      tabContent: <div>nothing</div>,
    },
    {
      tabTitle: ETabs.COMMENTS,
      tabContent: <div>nothing</div>,
    },
    {
      tabTitle: ETabs.QUESTIONS,
      tabContent: <div>nothing</div>,
    },
    {
      tabTitle: ETabs.VIOLATION_REPORT,
      tabContent: <div>nothing</div>,
    },
    {
      tabTitle: ETabs.TAGS,
      tabContent: <div>nothing</div>,
    },
  ];

  return (
    <div className=" flex flex-col h-full bg-white rounded-lg shadow-small">
      {getBranchId ? (
        <TabComponent
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headerClassName="!bg-white !py-0 border-b-normal !border-b-2 rounded-none"
          activeTabClassName="!rounded-none !border-t-0 border-x-0 border-b-purple-normal !border-b-2 !shadow-none !text-purple-normal !py-3"
          tabClassName="!border-none !h-auto !py-3 !px-4"
        />
      ) : (
        <EmptyList type={EEmptyList.BRANCH_INFO} />
      )}
    </div>
  );
};

export default BranchInfo;
