"use client";

import React, { useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import TabComponent from "@components/molecules/tab";
import PublishAdvancedSearch from "@components/organisms/publishSearch/publishAdvancedSearch";
import PublishContentSearch from "@components/organisms/publishSearch/publishContentSearch";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export enum ETabs {
  CONTENT_SEARCH = "جست و جو در محتوا",
  ADVANCED_SEARCH = "جستجوی پیشرفته",
}

const PublishSearchDialog = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.CONTENT_SEARCH);

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
      trigger={
        <Button variant="clasorPrimary" size="icon">
          <SearchIcon className="size-5" />
        </Button>
      }
      backToMain
      contentClassName="p-0"
    >
      <TabComponent
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabContentClassName="overflow-visible"
      />
    </InfoDialog>
  );
};

export default PublishSearchDialog;
