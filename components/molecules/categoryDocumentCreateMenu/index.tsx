import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { createCatDocDrawerAtom } from "@atom/category";
import { AddIcon, ArrowDownIcon } from "@components/atoms/icons";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";
import { Button, Typography } from "@material-tailwind/react";

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
        <>
          <div className="hidden xs:flex">
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
                  <div className="hidden xs:flex md:!hidden">
                    <AddIcon className="w-5 h-5 stroke-white" />
                  </div>
                </>
              }
              className="rounded-lg h-9 w-9 xs:w-auto !px-[6px] !bg-purple-normal "
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
