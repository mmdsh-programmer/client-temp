import React from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ERoles } from "@interface/enums";
import { useRepositoryStore } from "@store/repository";
import { IUser } from "@interface/users.interface";
import { useUserStore } from "@store/user";

interface IProps {
  user?: IUser;
  showDrawer?: boolean;
}

const UserMenu = ({ user, showDrawer }: IProps) => {
  const {
    setBlockService,
    setNotifService,
    setDeleteUser,
    setTransferOwnership,
    userDrawer,
    setUserDrawer,
    setSelectedUser,
  } = useUserStore();

  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });

  interface IMenuItem {
    text: string;
    onClick: () => void;
    className: string;
  }

  const menuList: IMenuItem[] = [
    {
      text: "دسترسی پیشرفته",
      onClick: () => {
        setBlockService(true);
        if (user) {
          setSelectedUser(user);
        }
      },
      className: "repo-user-menu__advanced-setting",
    },
    ...(getRepo?.roleName === ERoles.owner || getRepo?.roleName === ERoles.admin
      ? [
          {
            text: "دسترسی اعلانات",
            onClick: () => {
              setNotifService(true);
              if (user) {
                setSelectedUser(user);
              }
            },
            className: "repo-user-menu__notif-setting",
          },
        ]
      : []),
    ...(getRepo?.roleName === ERoles.owner && getRepo.roleName !== user?.userRole
      ? [
          {
            text: "انتقال مالکیت",
            onClick: () => {
              setTransferOwnership(true);
              if (user) {
                setSelectedUser(user);
              }
            },
            className: "repo-user-menu__transfer-ownership",
          },
          {
            text: "حذف کاربر",
            onClick: () => {
              setDeleteUser(true);
              if (user) {
                setSelectedUser(user);
              }
            },
            className: "repo-user-menu__remove-user !text-error",
          },
        ]
      : []),
  ];

  return showDrawer ? (
    <div className="repo-group-menu flex xs:hidden">
      <DrawerTemplate
        openDrawer={userDrawer}
        setOpenDrawer={() => {
          return setUserDrawer(false);
        }}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      onMobileClick={() => {
        setSelectedUser(user || null);
        setUserDrawer(true);
      }}
      menuList={menuList}
      className="repo-group-menu"
    />
  );
};

export default UserMenu;
