import React from "react";
import { DeleteIcon, EditIcon } from "@components/atoms/icons";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ITag } from "@interface/tags.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { IDomainTag } from "@interface/domain.interface";
import { useTagStore } from "@store/tag";

interface IProps {
  tag?: ITag | IDomainTag;
  showDrawer?: boolean;
}

const TagMenu = ({ tag, showDrawer }: IProps) => {
  const {
    setEditTag: setEditTagModal,
    setDeleteTag: setDeleteTagModal,
    tagDrawer: openTagActionDrawer,
    setTagDrawer: setOpenTagActionDrawer,
    setSelectedTag: setTag,
  } = useTagStore();

  const menuList = [
    {
      text: " ویرایش تگ",
      icon: <EditIcon className="h-4 w-4" />,
      onClick: () => {
        setEditTagModal(true);
        setOpenTagActionDrawer(false);
        if (tag) {
          setTag(tag);
        }
      },
      className: "edit-tag__button",
    },
    {
      text: "حذف تگ",
      icon: <DeleteIcon className="h-4 w-4" />,
      onClick: () => {
        setDeleteTagModal(true);
        setOpenTagActionDrawer(false);
        if (tag) {
          setTag(tag);
        }
      },
      className: "delete-tag__button",
    },
  ];

  return showDrawer ? (
    <div className="tag-menu flex xs:hidden">
      <DrawerTemplate
        openDrawer={openTagActionDrawer}
        setOpenDrawer={() => {
          return setOpenTagActionDrawer(false);
        }}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      setOpenDrawer={() => {
        setTag(tag);
        setOpenTagActionDrawer(true);
      }}
      menuList={menuList}
      className="tag-menu"
    />
  );
};

export default TagMenu;
