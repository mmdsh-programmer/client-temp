import {
 DeleteIcon,
 EditIcon
} from "@components/atoms/icons";
import {
  deleteTagAtom,
  editTagAtom,
  selectedTagAtom,
  tagDrawerAtom,
} from "@atom/tag";
import {
 useRecoilState,
 useSetRecoilState
} from "recoil";

import DrawerTemplate from "@components/templates/drawerTemplate";
import { ITag } from "@interface/tags.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import React from "react";

interface IProps {
  tag?: ITag;
  showDrawer?: boolean;
}

const TagMenu = ({
 tag, showDrawer 
}: IProps) => {
  const setEditTagModal = useSetRecoilState(editTagAtom);
  const setDeleteTagModal = useSetRecoilState(deleteTagAtom);
  const [openTagActionDrawer, setOpenTagActionDrawer] =
    useRecoilState(tagDrawerAtom);
  const setTag = useSetRecoilState(selectedTagAtom);

  const menuList = [
    {
      text: " ویرایش تگ",
      icon: <EditIcon className="w-4 h-4" />,
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
      icon: <DeleteIcon className="w-4 h-4" />,
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
    <div className="tag-menu xs:hidden flex">
      <DrawerTemplate
        openDrawer={openTagActionDrawer}
        setOpenDrawer={setOpenTagActionDrawer}
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
