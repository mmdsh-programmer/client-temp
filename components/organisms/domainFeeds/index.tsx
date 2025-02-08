import React from "react";
import DomainPublicFeed from "./domainPublicFeed";

export enum ETabs {
  PUBLIC_FEED = "خبرنامه عمومی",
  PRIVATE_FEED = "خبرنامه خصوصی",
}

const DomainFeeds = () => {
  // const [activeTab, setActiveTab] = useState<string>(ETabs.PUBLIC_FEED);

  // const tabList = [
  //   {
  //     tabTitle: ETabs.PUBLIC_FEED,
  //     tabContent: <DomainPublicFeed />,
  //   },
  //   {
  //     tabTitle: ETabs.PRIVATE_FEED,
  //     tabContent: (
  //       <div className="flex justify-center items-center h-full w-full">
  //         <Typography>اطلاعاتی در دست نیست</Typography>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    // <TabComponent
    //   tabList={tabList}
    //   activeTab={activeTab}
    //   setActiveTab={setActiveTab}
    //   headerClassName="!bg-white !py-0 border-b-normal !border-b-2 rounded-none max-w-[220px]"
    //   activeTabClassName="!rounded-none !border-t-0 border-x-0 border-b-purple-normal !border-b-2 !shadow-none !text-purple-normal !py-3"
    //   tabClassName="!border-none !h-auto !py-3 !px-4 "
    // />
    <DomainPublicFeed />
  );
};

export default DomainFeeds;
