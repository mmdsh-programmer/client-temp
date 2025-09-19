import React, { useState } from "react";
import {
  AddIcon,
  ArrowDownIcon,
  CategoryAddIcon,
  DocumentAddIcon,
  TemplateAddIcon,
} from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ERoles } from "@interface/enums";
import MenuTemplate from "@components/templates/menuTemplate";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";

interface IProps {
  openDrawer?: boolean;
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryDocumentCreateMenu = ({ openDrawer, setOpenDrawer }: IProps) => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const { repo: getRepo } = useRepositoryStore();
  const { setCategory, categoryShow: getCategoryShow } = useCategoryStore();

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    disabled?: boolean;
    onClick: () => void;
    className?: string;
  }[] = [
    {
      text: "سند جدید",
      icon: <DocumentAddIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        setCreateDocumentModal(true);
        setCategory(getCategoryShow);
      },
      className: "create-document",
    },
    {
      text: "نمونه سند",
      icon: <TemplateAddIcon className="h-4 w-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        setCreateTemplateModal(true);
        setCategory(getCategoryShow);
      },
      className: "create-template",
    },
    {
      text: "ایجاد دسته بندی",
      icon: <CategoryAddIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.writer || getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        setCreateCategoryModal(true);
        setCategory(getCategoryShow);
      },
      className: "create-category",
    },
  ];

  return (
    <>
      {openDrawer ? (
        <div className="categoryCreateMenu flex xs:hidden">
          <DrawerTemplate
            openDrawer={openDrawer}
            setOpenDrawer={() => {
              return setOpenDrawer?.(false);
            }}
            menuList={menuList}
          />
        </div>
      ) : (
        <>
          <div className="categoryCreateMenu hidden xs:flex">
            <MenuTemplate
              onMobileClick={() => {
                setOpenDrawer?.(true);
              }}
              menuList={menuList}
              icon={
                <>
                  <div className="hidden items-center justify-center gap-2 md:flex">
                    <Typography
                      placeholder=""
                      className="title_t3 !px-2 text-white"
                      {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                    >
                      ایجاد
                    </Typography>
                    <ArrowDownIcon className="h-5 w-5" />
                  </div>
                  <div className="hidden items-center justify-center md:!hidden xs:flex">
                    <AddIcon className="h-5 w-5 stroke-white" />
                  </div>
                </>
              }
              className="h-9 w-9 rounded-lg !bg-primary-normal !px-[6px] md:w-auto"
            />
          </div>
          <div className="absolute bottom-20 left-6 z-[999] xs:hidden">
            <Button
              placeholder=""
              className="z-[99] h-[54px] w-[54px] rounded-full bg-primary-normal p-0"
              onClick={() => {
                setOpenDrawer?.(true);
              }}
              {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
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
