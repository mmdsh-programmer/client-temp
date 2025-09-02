import React, { useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import { IFeedItem } from "@interface/feeds.interface";
import PublicFeedEditDialog from "@components/organisms/dialogs/publicFeed/publicFeedEditDialog";
import PublicFeedDeleteDialog from "@components/organisms/dialogs/publicFeed/publicFeedDeleteDialog";

interface IProps {
  feed: IFeedItem;
}

const PublicFeedMenu = ({ feed }: IProps) => {
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
      <MenuTemplate onMobileClick={() => {}} menuList={menuList} />
      {openEditFeedDialog ? (
        <PublicFeedEditDialog feed={feed} setOpen={setEditFeedDialog} />
      ) : null}
      {openDeleteFeedDialog ? (
        <PublicFeedDeleteDialog feed={feed} setOpen={setDeleteFeedDialog} />
      ) : null}
    </>
  );
};

export default PublicFeedMenu;
