import React, { useState } from "react";
import { CopyIcon, DeleteIcon, MoreDotIcon } from "@components/atoms/icons";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { IPublicKey } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useDeleteRepoKeyStore } from "@store/repository";

interface IProps {
  keyItem: IPublicKey;
  isList?: boolean;
}

const RepoKeyMenu = ({ keyItem, isList }: IProps) => {
  const setDeleteKeyModal = useDeleteRepoKeyStore((state) => {
    return state.setDeleteRepoKey;
  });
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<boolean | null>(false);

  const handleCopyKey = () => {
    copy(keyItem.key);
    toast.success("کلید با موفقیت کپی شد");
  };

  const menuList = [
    {
      text: "کپی کلید",
      icon: <CopyIcon className="h-4 w-4 fill-icon-active" />,
      onClick: () => {
        handleCopyKey();
        setOpenRepoActionDrawer(false);
      },
    },
    {
      text: "حذف ",
      icon: <DeleteIcon className="fillw-4 h-4" />,
      onClick: () => {
        setDeleteKeyModal(keyItem);
        setOpenRepoActionDrawer(false);
      },
    },
  ];

  return (
    <>
      {isList ? (
        <div className="flex xs:hidden">
          <MenuTemplate
            onMobileClick={() => {
              setOpenRepoActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                <MoreDotIcon className="h-4 w-4" />
              </div>
            }
          />
        </div>
      ) : (
        <div className="flex items-center justify-end gap-1">
          <MenuTemplate
            onMobileClick={() => {
              setOpenRepoActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                <MoreDotIcon className="h-4 w-4" />
              </div>
            }
          />
        </div>
      )}
      <div className="flex xs:hidden">
        <DrawerTemplate
          openDrawer={openRepoActionDrawer}
          setOpenDrawer={setOpenRepoActionDrawer}
          menuList={menuList}
        />
      </div>
    </>
  );
};

export default RepoKeyMenu;
