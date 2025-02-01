import React, { useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";
import BranchCreateDialog from "@components/organisms/dialogs/branch/branchCreateDialog";
import { IBranch } from "@interface/branch.interface";
import BranchDeleteDialog from "@components/organisms/dialogs/branch/branchDeleteDialog";
import BranchEditDialog from "@components/organisms/dialogs/branch/branchEditDialog";
import { branchIdAtom } from "@atom/branch";
import { useSetRecoilState } from "recoil";

interface IProps {
  branchItem: IBranch;
}

const BranchMenu = ({ branchItem }: IProps) => {
  const [editBranchModal, setEditBranchModal] = useState(false);
  const [deleteBranchModal, setDeleteBranchModal] = useState(false);
  const [createBranchModal, setCreateBranchModal] = useState(false);

  const setBranch = useSetRecoilState(branchIdAtom);

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: "ایجاد زیرشعبه",
      onClick: () => {
        setBranch(branchItem.id);
        setCreateBranchModal(true);
      },
    },
    {
      text: "ویرایش شعبه",
      onClick: () => {
        setBranch(branchItem.id);
        setEditBranchModal(true);
      },
    },
    {
      text: "حذف شعبه",
      onClick: () => {
        setBranch(branchItem.id);
        setDeleteBranchModal(true);
      },
    },
  ];

  return (
    <div
      onClick={(e) => {
        return e.stopPropagation();
      }}
    >
      <MenuTemplate
        setOpenDrawer={() => {}}
        menuList={menuList}
        icon={
          <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
            <MoreDotIcon className="w-4 h-4" />
          </div>
        }
      />
      {editBranchModal ? (
        <BranchEditDialog
          branch={branchItem}
          setOpen={() => {
            setEditBranchModal(false);
          }}
        />
      ) : null}
      {deleteBranchModal ? (
        <BranchDeleteDialog
          branch={branchItem}
          setOpen={() => {
            setDeleteBranchModal(false);
          }}
        />
      ) : null}
      {createBranchModal ? (
        <BranchCreateDialog
          setOpen={() => {
            setCreateBranchModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default BranchMenu;
