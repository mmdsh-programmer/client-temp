"use client";

import React, { useEffect, useState } from "react";
import PublishTab from "@components/molecules/publishTab";
import PublishQuestionAnswer from "./@publishQuestionAnswer";
import PublishComments from "./@publishComments";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { usePublishStore } from "@store/publish";

enum ETabs {
  QUESTION_ANSWER = "پرسش و پاسخ",
  COMMENTS = "نظرات کاربران",
}

const PublishFeeback = () => {
  const { data: getDomainInfo } = useGetDomainInfo();
  const [activeTab, setActiveTab] = useState<string>(ETabs.QUESTION_ANSWER);

  const { publishVersion } = usePublishStore();

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
    getDomainInfo?.hasComments && publishVersion
      ? {
          tabTitle: ETabs.COMMENTS,
          tabContent: (
            <PublishComments
              repoId={publishVersion.repoId}
              documentId={publishVersion.documentId}
            />
          ),
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
