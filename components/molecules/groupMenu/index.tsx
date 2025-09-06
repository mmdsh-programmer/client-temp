import React from "react";
import { IGetGroups } from "@interface/group.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ERoles } from "@interface/enums";
import { useGroupStore } from "@store/group";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  group?: IGetGroups;
  showDrawer?: boolean;
}

const GroupMenu = ({ group, showDrawer }: IProps) => {
  const {
    setEditGroup: setEditGroupModal,
    setDeleteGroup: setDeleteGroupModal,
    groupDrawer: getGroupDrawer,
    setGroupDrawer,
    setSelectedGroup: setGroup,
  } = useGroupStore();
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });

  const menuList = [
    {
      text: "اطلاعات گروه",
      onClick: () => {
        setEditGroupModal(true);
        if (group) {
          setGroup(group);
        }
      },
      className: "repo-group-menu__edit",
    },
    {
      text: "حذف گروه",
      onClick: () => {
        setDeleteGroupModal(true);
        if (group) {
          setGroup(group);
        }
      },
      className: "repo-group-menu__delete",
      disabled: getRepo?.roleName !== ERoles.owner && getRepo?.roleName !== ERoles.admin,
    },
  ];

  return showDrawer ? (
    <div className="repo-group-menu flex xs:hidden">
      <DrawerTemplate
        openDrawer={getGroupDrawer}
        setOpenDrawer={() => {
          return setGroupDrawer(false);
        }}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      onMobileClick={() => {
        setGroup(group);
        setGroupDrawer(true);
      }}
      menuList={menuList}
      className="repo-group-menu"
    />
  );
};

export default GroupMenu;
