import React, { useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { usePublishStore } from "@store/publish";
import TabComponent from "@components/molecules/tab";
import PublishAdvancedSearch from "@components/organisms/publishSearch/publishAdvancedSearch";
import PublishContentSearch from "@components/organisms/publishSearch/publishContentSearch";

export enum ETabs {
  CONTENT_SEARCH = "جست و جو در محتوا",
  ADVANCED_SEARCH = "جستجوی پیشرفته",
}

const PublishSearchContentDialog = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.CONTENT_SEARCH);

  const setOpen = usePublishStore((s) => {
    return s.setOpenPublishPageSearchContent;
  });

  const tabList = [
    {
      tabTitle: ETabs.CONTENT_SEARCH,
      tabContent: activeTab === ETabs.CONTENT_SEARCH ? <PublishContentSearch /> : null,
    },
    {
      tabTitle: ETabs.ADVANCED_SEARCH,
      tabContent: activeTab === ETabs.ADVANCED_SEARCH ? <PublishAdvancedSearch /> : null,
    },
  ];

  return (
    <InfoDialog
      dialogHeader="جست و جو "
      setOpen={() => {
        return setOpen(false);
      }}
      className="publish-search-dialog flex w-full max-w-full flex-col rounded-none bg-primary xs:!min-w-[600px] xs:!max-w-[600px] xs:rounded-lg"
    >
      <div className="px-5 py-4">
        <TabComponent
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabContentClassName="overflow-visible"
        />
      </div>
    </InfoDialog>
  );
};

export default PublishSearchContentDialog;
