"use client";

import React, { useEffect, useState } from "react";
import PublishTab from "@components/molecules/publishTab";
import PublishQuestionAnswer from "./PublishQuestionAnswer";
import PublishComments from "./PublishComments";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";

interface IProps {
  postId: number;
}

enum ETabs {
  QUESTION_ANSWER = "پرسش و پاسخ",
  COMMENTS = "نظرات کاربران",
}

const PublishFeeback = ({ postId }: IProps) => {
  const { data: getDomainInfo } = useGetDomainInfo();
  const [activeTab, setActiveTab] = useState<string>(ETabs.QUESTION_ANSWER);

  useEffect(() => {
    if (getDomainInfo) {
      if (getDomainInfo.hasComments && !getDomainInfo.hasQuestions) {
        setActiveTab(ETabs.COMMENTS);
      } else {
        setActiveTab(ETabs.QUESTION_ANSWER);
      }
    }
  }, [getDomainInfo]);

  const tabList = [
    getDomainInfo?.hasQuestions
      ? {
          tabTitle: ETabs.QUESTION_ANSWER,
          tabContent: <PublishQuestionAnswer />,
        }
      : null,
    getDomainInfo?.hasComments
      ? {
          tabTitle: ETabs.COMMENTS,
          tabContent: <PublishComments postId={postId} />,
        }
      : null,
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];

  return (
    <section className="flex w-full items-center gap-4 bg-white">
      {getDomainInfo?.hasQuestions || getDomainInfo?.hasComments ? (
        <PublishTab
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabHeaderClassName="w-full"
        />
      ) : null}
    </section>
  );
};

export default PublishFeeback;
