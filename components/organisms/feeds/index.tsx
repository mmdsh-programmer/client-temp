"use client";

import React, { useState } from "react";
import PublicFeedList from "@components/organisms/feeds/publicFeedList";
import PublishTab from "@components/molecules/publishTab";
import UserFollowingRepos from "@components/organisms/feeds/userFollowingRepos";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import useGetUser from "@hooks/auth/useGetUser";

enum ETabs {
  PUBLIC_FEEDS = "خبرنامه های عمومی",
  PRIVATE_FEEDS = "خبرنامه های خصوصی",
}

const Feeds = () => {
  const { data: userInfo } = useGetUser();
  const [activeTab, setActiveTab] = useState<string>(ETabs.PUBLIC_FEEDS);

  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePrivateFeed } = content;

  const tabList = [
    {
      tabTitle: ETabs.PUBLIC_FEEDS,
      tabContent: <PublicFeedList />,
    },
    ...(userInfo && enablePrivateFeed
      ? [
          {
            tabTitle: ETabs.PRIVATE_FEEDS,
            tabContent: <UserFollowingRepos ssoId={+userInfo.ssoId} />,
          },
        ]
      : []),
  ];

  return (
    <section className="flex w-full items-center gap-4 bg-white">
      <PublishTab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabHeaderClassName="w-full"
      />
    </section>
  );
};

export default Feeds;
