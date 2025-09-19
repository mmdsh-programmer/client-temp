import React, { useState } from "react";
import CreateRepoPublicLink from "@components/organisms/publicLink/createRepoPublicLink";
import { DialogBody } from "@material-tailwind/react";
import GroupCreateDialog from "@components/organisms/dialogs/group/groupCreateDialog";
import GroupDeleteDialog from "@components/organisms/dialogs/group/groupDeleteDialog";
import GroupEditDialog from "@components/organisms/dialogs/group/groupEditDialog";
import GroupMenu from "@components/molecules/groupMenu";
import Groups from "@components/organisms/group";
import InfoDialog from "@components/templates/dialog/infoDialog";
import PublicLink from "@components/organisms/publicLink";
import PublishLink from "@components/organisms/publishLink";
import TabComponent from "@components/molecules/tab";
import Users from "@components/organisms/users";
import UserConfigPanelDialog from "../configPanel/userConfigPanelDialog";
import { useRepositoryStore } from "@store/repository";
import { useGroupStore } from "@store/group";
import { usePublicStore } from "@store/public";
import { useUserStore } from "@store/user";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ETabs {
  USERS = "اشتراک گذاری",
  GROUPS = "گروه‌ها",
  LINK = "لینک",
  PUBLISH = "انتشار",
}

const RepoShareDialog = ({ setOpen }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.USERS);

  const { repo: getRepo } = useRepositoryStore();
  const { createGroup, setCreateGroup } = useGroupStore();
  const { editGroup, setEditGroup } = useGroupStore();
  const { deleteGroup, setDeleteGroup } = useGroupStore();
  const { openShareAccess, setOpenShareAccess } = usePublicStore();
  const { selectedUser } = useUserStore();

  const handleClose = () => {
    setOpen(false);
  };

  const tabList = [
    {
      tabTitle: ETabs.USERS,
      tabContent: activeTab === ETabs.USERS ? <Users /> : null,
    },
    {
      tabTitle: ETabs.GROUPS,
      tabContent: activeTab === ETabs.GROUPS ? <Groups /> : null,
    },
    getRepo?.roleName === "owner" && {
      tabTitle: ETabs.LINK,
      tabContent: activeTab === ETabs.LINK ? <PublicLink /> : null,
    },
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin" ? {
      tabTitle: ETabs.PUBLISH,
      tabContent: activeTab === ETabs.PUBLISH ? <PublishLink /> : null,
    } : null,
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];

  if (openShareAccess) {
    return <CreateRepoPublicLink setOpen={setOpenShareAccess} />;
  }
  if (createGroup) {
    return <GroupCreateDialog setOpen={setCreateGroup} />;
  }
  if (editGroup) {
    return <GroupEditDialog setOpen={setEditGroup} />;
  }
  if (deleteGroup) {
    return <GroupDeleteDialog setOpen={setDeleteGroup} />;
  }
  if (selectedUser?.userInfo) {
    return <UserConfigPanelDialog />;
  }

  return (
    <InfoDialog
      dialogHeader="اشتراک گذاری"
      setOpen={handleClose}
      className="repo-share-dialog xs:!min-w-[450px] xs:!max-w-[450px] flex flex-col !h-full w-full max-w-full xs:!h-[600px] bg-primary rounded-none xs:rounded-lg "
    >
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="p-0 h-full">
        <div className="flex flex-col gap-4 p-4 xs:p-6">
          <TabComponent
            tabList={tabList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </DialogBody>
      <GroupMenu showDrawer />
    </InfoDialog>
  );
};

export default RepoShareDialog;
