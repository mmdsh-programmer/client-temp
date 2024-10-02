import React from "react";
import { IGetGroups } from "@interface/group.interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  deleteGroupAtom,
  editGroupAtom,
  groupDrawerAtom,
  selectedGroupAtom,
} from "@atom/group";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";

interface IProps {
  group?: IGetGroups;
  showDrawer?: boolean;
}

const GroupMenu = ({ group, showDrawer }: IProps) => {
  const setEditGroupModal = useSetRecoilState(editGroupAtom);
  const setDeleteGroupModal = useSetRecoilState(deleteGroupAtom);
  const [getGroupDrawer, setGroupDrawer] = useRecoilState(groupDrawerAtom);
  const setGroup = useSetRecoilState(selectedGroupAtom);

  const menuList = [
    {
      text: "ویرایش",
      onClick: () => {
        setEditGroupModal(true);
        if (group) {
          setGroup(group);
        }
      },
    },
    {
      text: "حذف گروه",
      onClick: () => {
        setDeleteGroupModal(true);
        if (group) {
          setGroup(group);
        }
      },
    },
  ];

  return showDrawer ? (
    <div className="xs:hidden flex">
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
    />
  );
};

export default GroupMenu;
