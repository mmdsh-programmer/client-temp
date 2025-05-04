import React from "react";
import { IGetGroups } from "@interface/group.interface";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { deleteGroupAtom, editGroupAtom, groupDrawerAtom, selectedGroupAtom } from "@atom/group";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";

interface IProps {
  group?: IGetGroups;
  showDrawer?: boolean;
}

const GroupMenu = ({ group, showDrawer }: IProps) => {
  const setEditGroupModal = useSetRecoilState(editGroupAtom);
  const setDeleteGroupModal = useSetRecoilState(deleteGroupAtom);
  const [getGroupDrawer, setGroupDrawer] = useRecoilState(groupDrawerAtom);
  const setGroup = useSetRecoilState(selectedGroupAtom);
  const getRepo = useRecoilValue(repoAtom);

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
      disabled: getRepo?.roleName !== ERoles.owner,
    },
  ];

  return showDrawer ? (
    <div className="repo-group-menu flex xs:hidden">
      <DrawerTemplate
        openDrawer={getGroupDrawer}
        setOpenDrawer={setGroupDrawer}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      setOpenDrawer={() => {
        setGroup(group);
        setGroupDrawer(true);
      }}
      menuList={menuList}
      className="repo-group-menu"
    />
  );
};

export default GroupMenu;
