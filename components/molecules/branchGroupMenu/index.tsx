import React, { useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import PositionEditDialog from "@components/organisms/dialogs/position/positionEditDialog";
import PositionDeleteDialog from "@components/organisms/dialogs/position/positionDeleteDialog";

interface IProps {
  group: any;
}

const BranchGroupMenu = ({ group }: IProps) => {
  const [openEditGroupDialog, setEditGroupDialog] = useState(false);
  const [openDeleteGroupDialog, setDeleteGroupDialog] = useState(false);

  const menuList = [
    {
      text: "ویرایش گروه",
      onClick: () => {
        setEditGroupDialog(true);
      },
    },
    {
      text: "حذف گروه",
      onClick: () => {
        setDeleteGroupDialog(true);
      },
    },
  ];
  return (
    <>
      <MenuTemplate setOpenDrawer={() => {}} menuList={menuList} />
      {openEditGroupDialog ? <PositionEditDialog group={group} setOpen={setEditGroupDialog} /> : null}
      {openDeleteGroupDialog ? <PositionDeleteDialog group={group} setOpen={setDeleteGroupDialog} /> : null}
    </>
  );
};

export default BranchGroupMenu;
