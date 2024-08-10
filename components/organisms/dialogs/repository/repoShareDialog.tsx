import React, { useState } from "react";
import {
  Tab,
  TabsHeader,
  TabPanel,
  TabsBody,
  Tabs,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import RepoShare from "@components/organisms/repoShare/repoShare";
import RepoGroup from "@components/organisms/repoShare/repoGroup";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createGroupAtom, deleteGroupAtom, editGroupAtom } from "@atom/group";
import GroupCreateDialog from "@components/organisms/dialogs/group/groupCreateDialog";
import { IRepo } from "@interface/repo.interface";
import GroupEditDialog from "@components/organisms/dialogs/group/groupEditDialog";
import GroupDeleteDialog from "@components/organisms/dialogs/group/groupDeleteDialog";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import GroupMenu from "@components/organisms/repoShare/repoGroup/groupMenu";
import RepoPublicLink from "@components/organisms/repoShare/repoPublicLink";
import { repoAtom } from "@atom/repository";
import { openShareAccess } from "@atom/public";
import CreateRepoPublicLink from "@components/organisms/repoShare/repoPublicLink/createRepoPublicLink";
import RepoPublish from "@components/organisms/repoShare/repoPublish";

interface IProps {
  repo: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ETabs {
  USERS = "اشتراک گذاری",
  GROUPS = "گروه‌ها",
  LINK = "لینک",
  PUBLISH = "انتشار",
}

const data = [ETabs.USERS, ETabs.GROUPS, ETabs.LINK, ETabs.PUBLISH];

const RepoShareDialog = ({ setOpen }: IProps) => {
  const setRepository = useSetRecoilState(repoAtom);
  const [getCreateGroupModal, setCreateGroupModal] =
    useRecoilState(createGroupAtom);
  const [getEditGroupModal, setEditGroupModal] = useRecoilState(editGroupAtom);
  const [getDeleteGroupModal, setDeleteGroupModal] =
    useRecoilState(deleteGroupAtom);
  const [getOpenShareAccess, setOpenShareAccess] =
    useRecoilState(openShareAccess);

  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.USERS);

  const handleClose = () => {
    setOpen(false);
    if (window.location.pathname === "/admin/dashboard") {
      setRepository(null);
    }
  };

  if (!!getOpenShareAccess) {
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
    <>
      <Dialog
        placeholder=""
        size="sm"
        open={true}
        handler={handleClose}
        className={`xs:!min-w-[450px] xs:!max-w-[450px] flex flex-col !h-full w-full max-w-full xs:!h-auto bg-primary rounded-none xs:rounded-lg `}
      >
        <DialogHeader
          placeholder="dialog header"
          className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
        >
          <div className="block xs:hidden">
            <BackButton onClick={handleClose} />
          </div>
          <Typography className="form__title">اشتراک گذاری</Typography>
          <div className="hidden xs:block">
            <CloseButton onClose={handleClose} />
          </div>
        </DialogHeader>
        <div className="block xs:hidden h-2 w-full bg-secondary" />
        <DialogBody placeholder="dialog body" className="p-0 h-full">
          <div className="flex flex-col gap-4 p-4 xs:p-6">
            <Tabs value={activeTab}>
              <TabsHeader
                className="flex items-center p-[2px] rounded-lg bg-secondary"
                indicatorProps={{
                  className: "",
                }}
                placeholder="tabs-header"
              >
                {data.map((tab) => (
                  <Tab
                    key={tab}
                    value={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex font-iranYekan h-9 p-2 text-secondary text-[12px] leading-[18px] -tracking-[0.12px] font-medium `}
                    placeholder="tab"
                    activeClassName="!text-primary p-2 rounded-lg shadow-small"
                  >
                    {tab}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody placeholder="tab-body" className="">
                {activeTab === ETabs.USERS && (
                  <TabPanel value={ETabs.USERS} className="p-0 ">
                    <RepoShare />
                  </TabPanel>
                )}
                {activeTab === ETabs.GROUPS && (
                  <TabPanel value={ETabs.GROUPS} className="p-0 ">
                    <RepoGroup />
                  </TabPanel>
                )}
                {activeTab === ETabs.LINK && (
                  <TabPanel value={ETabs.LINK} className="p-0 ">
                    <RepoPublicLink />
                  </TabPanel>
                )}
                {activeTab === ETabs.PUBLISH && (
                  <TabPanel value={ETabs.PUBLISH} className="p-0 ">
                    <RepoPublish />
                  </TabPanel>
                )}
              </TabsBody>
            </Tabs>
          </div>
        </DialogBody>
        <GroupMenu showDrawer={true} />
      </Dialog>
    </>
  );
};

export default RepoShareDialog;
