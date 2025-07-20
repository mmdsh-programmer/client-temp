import React, { useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import { IFeedItem } from "@interface/feeds.interface";
import PrivateFeedEditDialog from "@components/organisms/dialogs/privateFeed/privateFeedEditDialog";
import PrivateFeedDeleteDialog from "@components/organisms/dialogs/privateFeed/privateFeedDeleteDialog";

interface IProps {
  feed: IFeedItem;
}

const PrivateFeedMenu = ({ feed }: IProps) => {
  const [openEditFeedDialog, setEditFeedDialog] = useState(false);
  const [openDeleteFeedDialog, setDeleteFeedDialog] = useState(false);

  const menuList = [
    {
      text: "ویرایش خبرنامه",
      onClick: () => {
        setEditFeedDialog(true);
      },
    },
    {
      text: "حذف خبرنامه",
      onClick: () => {
        setDeleteFeedDialog(true);
      },
    },
  ];
  return (
    <>
      <MenuTemplate setOpenDrawer={() => {}} menuList={menuList} />
      {openEditFeedDialog ? (
        <PrivateFeedEditDialog feed={feed} setOpen={setEditFeedDialog} />
      ) : null}
      {openDeleteFeedDialog ? (
        <PrivateFeedDeleteDialog feed={feed} setOpen={setDeleteFeedDialog} />
      ) : null}
    </>
  );
};

export default PrivateFeedMenu;
