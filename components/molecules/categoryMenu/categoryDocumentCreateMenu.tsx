import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, createCatDocDrawerAtom } from "@atom/category";
import { AddIcon, ArrowDownIcon } from "@components/atoms/icons";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import Text from "@components/atoms/typograghy/text";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";

interface IProps {
  showDrawer?: boolean;
}

const CategoryDocumentCreateMenu = ({ showDrawer }: IProps) => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const [openCreateDrawer, setOpenCreateDrawer] = useRecoilState(
    createCatDocDrawerAtom
  );

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: " ایجاد سند جدید",
      onClick: () => {
        setCreateDocumentModal(true);
      },
    },
    {
      text: "نمونه سند",
      onClick: () => {
        setCreateTemplateModal(true);
      },
    },
    {
      text: "ایجاد دسته بندی",
      onClick: () => {
        setCreateCategoryModal(true);
      },
    },
  ];

  console.log("------------------- create document -----------------", createDocumentModal)

  return (
    <>
      {!!showDrawer ? (
        <div className="xs:hidden flex">
          <DrawerTemplate
            openDrawer={openCreateDrawer}
            setOpenDrawer={setOpenCreateDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <MenuTemplate
          setOpenDrawer={() => {
            setOpenCreateDrawer(true);
          }}
          menuList={menuList}
          icon={
            <>
              <div className="hidden xs:flex justify-center items-center gap-2">
                <Text className="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2">
                  ایجاد
                </Text>
                <ArrowDownIcon className="w-5 h-5" />
              </div>
              <div className="flex xs:hidden">
                <AddIcon className="w-5 h-5 stroke-white" />
              </div>
            </>
          }
          className="rounded-lg h-9 w-9 xs:w-auto !px-[6px] !bg-purple-normal "
        />
      )}
      {createCategoryModal && (
        <CategoryCreateDialog
          setOpen={() => {
            setCreateCategoryModal(false);
          }}
        />
      )}
      {createDocumentModal && (
        <DocumentCreate
          isTemplate={false}
          setOpen={() => setCreateDocumentModal(false)}
        />
      )}
      {createTemplateModal && (
        <DocumentCreate
          isTemplate={true}
          setOpen={() => setCreateTemplateModal(false)}
        />
      )}
    </>
  );
};

export default CategoryDocumentCreateMenu;
