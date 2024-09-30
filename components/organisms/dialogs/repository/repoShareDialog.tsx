import React, { useState } from "react";
import {
 createGroupAtom,
 deleteGroupAtom,
 editGroupAtom
} from "@atom/group";
import {
 useRecoilState,
 useSetRecoilState
} from "recoil";

import CreateRepoPublicLink from "@components/organisms/publicLink/createRepoPublicLink";
import { DialogBody } from "@material-tailwind/react";
import GroupCreateDialog from "@components/organisms/dialogs/group/groupCreateDialog";
import GroupDeleteDialog from "@components/organisms/dialogs/group/groupDeleteDialog";
import GroupEditDialog from "@components/organisms/dialogs/group/groupEditDialog";
import GroupMenu from "@components/molecules/groupMenu";
import Groups from "@components/organisms/group";
import InfoDialog from "@components/templates/dialog/infoDialog";
import PublicLink from "@components/organisms/publicLink";
import Publish from "@components/organisms/publish";
import TabComponent from "@components/molecules/tab";
import Users from "@components/organisms/users";
import { openShareAccessAtom } from "@atom/public";
import { repoAtom } from "@atom/repository";

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

  const setRepository = useSetRecoilState(repoAtom);
  const [getCreateGroupModal, setCreateGroupModal] =
    useRecoilState(createGroupAtom);
  const [getEditGroupModal, setEditGroupModal] = useRecoilState(editGroupAtom);
  const [getDeleteGroupModal, setDeleteGroupModal] =
    useRecoilState(deleteGroupAtom);
  const [getOpenShareAccess, setOpenShareAccess] =
    useRecoilState(openShareAccessAtom);

  const handleClose = () => {
    setOpen(false);
    if (window.location.pathname === "/admin/dashboard") {
      setRepository(null);
    }
  };

  const tabList = [
    {
 tabTitle: ETabs.USERS, tabContent: <Users /> 
},
    {
 tabTitle: ETabs.GROUPS, tabContent: <Groups /> 
},
    {
 tabTitle: ETabs.LINK, tabContent: <PublicLink /> 
},
    {
 tabTitle: ETabs.PUBLISH, tabContent: <Publish /> 
},
  ];

  if (getOpenShareAccess) {
    return <CreateRepoPublicLink setOpen={setOpenShareAccess} />;
  }
  if (getCreateGroupModal) {
    return <GroupCreateDialog setOpen={setCreateGroupModal} />;
  }
  if (getEditGroupModal) {
    return <GroupEditDialog setOpen={setEditGroupModal} />;
  }
  if (getDeleteGroupModal) {
    return <GroupDeleteDialog setOpen={setDeleteGroupModal} />;
  }

  return (
    <InfoDialog
        dialogHeader="اشتراک گذاری"
        setOpen={handleClose}
        className="xs:!min-w-[450px] xs:!max-w-[450px] flex flex-col !h-full w-full max-w-full xs:!h-[600px] bg-primary rounded-none xs:rounded-lg "
      >
        <DialogBody placeholder="dialog body" className="p-0 h-full">
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
