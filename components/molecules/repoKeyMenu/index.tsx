import {
 CopyIcon, DeleteIcon, MoreDotIcon 
} from "@components/atoms/icons";
import React, { useState } from "react";

import DrawerTemplate from "@components/templates/drawerTemplate";
import { IPublicKey } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import copy from "copy-to-clipboard";
import { deleteRepoKeyAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

interface IProps {
  keyItem: IPublicKey;
  isList?: boolean;
}

const RepoKeyMenu = ({
 keyItem, isList 
}: IProps) => {
  const setDeleteKeyModal = useSetRecoilState(deleteRepoKeyAtom);
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);

  const handleCopyKey = () => {
    copy(keyItem.key);
    toast.success("کلید با موفقیت کپی شد");
  };

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
    </>
  );
};

export default RepoKeyMenu;
