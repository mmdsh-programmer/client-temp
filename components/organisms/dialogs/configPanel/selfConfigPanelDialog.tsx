import React, { useState } from "react";
import { DialogBody } from "@material-tailwind/react";
import { useUserStore } from "@store/user";
import InfoDialog from "@components/templates/dialog/infoDialog";
import TabComponent from "@components/molecules/tab";
import SelfBlockServices from "./selfBlockServices";
import SelfNotifServices from "./selfNotifServices";

export enum ETabs {
  BLOCK_SERVICES = "دسترسی سرویس‌ها",
  NOTIF_SERVICES = "تنطیمات اعلانات",
}

const SelfConfigPanelDialog = () => {
  const { setSelectedUser } = useUserStore();

  const [activeTab, setActiveTab] = useState<string>(ETabs.BLOCK_SERVICES);

  const handleClose = () => {
    return setSelectedUser(null);
  };

  const tabList = [
    {
      tabTitle: ETabs.BLOCK_SERVICES,
      tabContent: activeTab === ETabs.BLOCK_SERVICES ? <SelfBlockServices /> : null,
    },
    {
      tabTitle: ETabs.NOTIF_SERVICES,
      tabContent: activeTab === ETabs.NOTIF_SERVICES ? <SelfNotifServices /> : null,
    },
  ];

  return (
    <InfoDialog
      dialogHeader="تنظیمات پیشرفته"
      setOpen={handleClose}
      className="repo-share-dialog flex !h-full w-full max-w-full flex-col rounded-none bg-primary xs:!h-[600px] xs:!min-w-[450px] xs:!max-w-[450px] xs:rounded-lg"
      backToMain
    >
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="h-full p-0">
        <div className="flex flex-col gap-4 p-4 xs:p-6">
          <TabComponent tabList={tabList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </DialogBody>
    </InfoDialog>
  );
};

export default SelfConfigPanelDialog;
