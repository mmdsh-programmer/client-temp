import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom, createCatDocDrawerAtom } from "@atom/category";
import {
  AddIcon,
  ArrowDownIcon,
  CategoryAddIcon,
  DocumentAddIcon,
  TemplateAddIcon,
} from "@components/atoms/icons";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";
import { Button, Typography } from "@material-tailwind/react";
import { ERoles } from "@interface/enums";
import { repoAtom } from "@atom/repository";

interface IProps {
  showDrawer?: boolean;
}

const CategoryDocumentCreateMenu = ({ showDrawer }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const setCategory = useSetRecoilState(categoryAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const [openCreateDrawer, setOpenCreateDrawer] = useRecoilState(
    createCatDocDrawerAtom
  );

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    disabled?: boolean;
    onClick: () => void;
  }[] = [
    {
      text: "سند جدید",
      icon: <DocumentAddIcon className="w-4 h-4" />,
      disabled: getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        setCreateDocumentModal(true);
        setCategory(getCategoryShow);
      },
    },
    {
      text: "نمونه سند",
      icon: <TemplateAddIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        setCreateTemplateModal(true);
        setCategory(getCategoryShow);
      },
    },
    {
      text: "ایجاد دسته بندی",
      icon: <CategoryAddIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        setCreateCategoryModal(true);
        setCategory(getCategoryShow);
      },
    },
  ];

  return (
    <>
      {showDrawer ? (
        <div className="categoryCreateMenu xs:hidden flex">
          <DrawerTemplate
            openDrawer={openCreateDrawer}
            setOpenDrawer={setOpenCreateDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <>
          <div className="categoryCreateMenu hidden xs:flex">
            <MenuTemplate
              setOpenDrawer={() => {
                setOpenCreateDrawer(true);
              }}
              menuList={menuList}
              icon={
                <>
                  <div className="hidden md:flex justify-center items-center gap-2">
                    <Typography className="title_t3 text-white !px-2">
                      ایجاد
                    </Typography>
                    <ArrowDownIcon className="w-5 h-5" />
                  </div>
                  <div className="hidden xs:flex md:!hidden justify-center items-center">
                    <AddIcon className="w-5 h-5 stroke-white" />
                  </div>
                </>
              }
              className="rounded-lg h-9 w-9 md:w-auto !px-[6px] !bg-purple-normal "
            />
          </div>
          <div className="absolute z-[999] bottom-20 left-6 xs:hidden">
            <Button
              className=" h-[54px] w-[54px] z-[99] p-0 bg-purple-normal rounded-full "
              onClick={() => {
                setOpenCreateDrawer(true);
              }}
            >
              <AddIcon className="h-6 w-6 stroke-white" />
            </Button>
          </div>
        </>
      )}
      {createCategoryModal ? (
        <CategoryCreateDialog
          setOpen={() => {
            setCreateCategoryModal(false);
          }}
        />
      ) : null}
      {createDocumentModal ? (
        <DocumentCreate
          isTemplate={false}
          setOpen={() => {
            return setCreateDocumentModal(false);
          }}
        />
      ) : null}
      {createTemplateModal ? (
        <DocumentCreate
          isTemplate
          setOpen={() => {
            return setCreateTemplateModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default CategoryDocumentCreateMenu;
