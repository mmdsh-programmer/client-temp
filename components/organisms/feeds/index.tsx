"use client";

import React, { useState } from "react";
import PublicFeedList from "./publicFeedList";
import PublishTab from "@components/molecules/publishTab";
import useGetUser from "@hooks/auth/useGetUser";
import PrivateFeedList from "./privateFeedList";

enum ETabs {
  PUBLIC_FEEDS = "خبرنامه های عمومی",
  PRIVATE_FEEDS = "خبرنامه های خصوصی",
}

const Feeds = () => {
  const {data: userInfo} = useGetUser();
  const [activeTab, setActiveTab] = useState<string>(ETabs.PUBLIC_FEEDS);

  const tabList = [
    {
      tabTitle: ETabs.PUBLIC_FEEDS,
      tabContent: <PublicFeedList />,
    },
    ...(userInfo ? [{
      tabTitle: ETabs.PRIVATE_FEEDS,
      tabContent: <PrivateFeedList ssoId={+userInfo.ssoId} />,
    }] : []),
  ];

  return (
    <section className="w-full min-h- flex items-center gap-4 bg-white">
      <PublishTab
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabHeaderClassName="w-full"
        tabPanelClassName="!h-[calc(100vh-250px)] min-h-[unset]"
      />
    </section>
  );
};

export default Feeds;
