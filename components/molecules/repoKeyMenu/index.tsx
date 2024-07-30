import React, { useState } from "react";
import { CopyIcon, DeleteIcon, MoreDotIcon } from "@components/atoms/icons";
import { IPublicKey, IRepo } from "@interface/repo.interface";
import RepoKeyDeleteDialog from "@components/organisms/dialogs/repository/repoKey/repoKeyDeleteDialog";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";

interface IProps {
  keyItem: IPublicKey;
  isList?: boolean;
}

const RepoKeyMenu = ({ keyItem, isList }: IProps) => {
  const [deleteKeyModal, setDeleteKeyModal] = useState(false);
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);

  const handleCopyKey = () => {};

  const menuList = [
    {
      text: "کپی کلید",
      icon: <CopyIcon className="w-4 h-4 fill-icon-active" />,
      onClick: () => {
        handleCopyKey();
        setOpenRepoActionDrawer(false);
      },
    },
    {
      text: "حذف ",
      icon: <DeleteIcon className="fillw-4 h-4" />,
      onClick: () => {
        setDeleteKeyModal(true);
        setOpenRepoActionDrawer(false);
      },
    },
  ];

  return (
    <>
      {isList ? (
        <div className="flex xs:hidden">
          <MenuTemplate
            setOpenDrawer={() => {
              setOpenRepoActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                <MoreDotIcon className="w-4 h-4" />
              </div>
            }
          />
        </div>
      ) : (
        <div className="flex items-center gap-1 justify-end">
          <MenuTemplate
            setOpenDrawer={() => {
              setOpenRepoActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                <MoreDotIcon className="w-4 h-4" />
              </div>
            }
          />
        </div>
      )}
      <div className="xs:hidden flex">
        <DrawerTemplate
          openDrawer={openRepoActionDrawer}
          setOpenDrawer={setOpenRepoActionDrawer}
          menuList={menuList}
        />
      </div>

      {deleteKeyModal && (
        <RepoKeyDeleteDialog keyItem={keyItem} setOpen={setDeleteKeyModal} />
      )}
    </>
  );
};

export default RepoKeyMenu;
