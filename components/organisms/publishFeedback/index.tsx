"use client";

import React, { useState } from "react";
import PublishTab from "@components/molecules/publishTab";
import PublishQuestionAnswer from "./PublishQuestionAnswer";
import PublishComments from "./PublishComments";

enum ETabs {
  QUESTION_ANSWER = "پرسش و پاسخ",
  COMMENTS = "نظرات کاربران",
}

const PublishFeeback = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.QUESTION_ANSWER);

  const tabList = [
    {
      tabTitle: ETabs.QUESTION_ANSWER,
      tabContent: <PublishQuestionAnswer />,
    },
    {
      tabTitle: ETabs.COMMENTS,
      tabContent: <PublishComments />,
    },
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];
  return (
    <section className="w-full flex items-center gap-4 bg-white">
      <PublishTab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabHeaderClassName="w-full"
      />
    </section>
  );
};

export default PublishFeeback;
