import React, { useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import { IRepo } from "@interface/repo.interface";
import PublishRepoEditOrderDialog from "./publishRepoEditOrderDialog";

interface IProps {
  repo: IRepo;
}

const PublishRepoMenu = ({ repo }: IProps) => {
  const [openEditRepoDialog, setEditRepoDialog] = useState(false);

  const menuList = [
    {
      text: "اولویت بندی",
      onClick: () => {
        setEditRepoDialog(true);
      },
    },
  ];
  return (
    <>
      <MenuTemplate onMobileClick={() => {}} menuList={menuList} />
      {openEditRepoDialog ? (
        <PublishRepoEditOrderDialog repo={repo} setOpen={setEditRepoDialog} />
      ) : null}
    </>
  );
};

export default PublishRepoMenu;
