"use client";

import { Button, Typography } from "@material-tailwind/react";
import { ETourSection, useTourStore } from "@store/tour";
import CategoryChildren from "./categoryChildren";
import CategoryDocumentCreateMenu from "../../molecules/categoryDocumentCreateMenu";
import CategoryListMode from "@components/molecules/categoryListMode";
import FilterMobileView from "../advancedFilterView/filterMobileView";
import { InfoIcon } from "@components/atoms/icons";
import React, { useCallback, useState } from "react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import CategoryDialogs from "@components/molecules/categoryDialogs";
import { useCategoryDrawerStore, useCategoryStore } from "@store/category";
import useCategoryMenuList from "@components/molecules/categoryMenu/useCategoryMenuList";
import DocumentDialogs from "@components/molecules/documentDialogs";
import { useDocumentDrawerStore, useDocumentStore } from "@store/document";
import useDocumentMenuList from "@components/molecules/documentMenu/useDocumentMenuList";

const CategoryList = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { category, setCategory } = useCategoryStore();
  const { setCategoryDrawer, categoryDrawer } = useCategoryDrawerStore();
  const { documentDrawer, setDocumentDrawer } = useDocumentDrawerStore();
  const { selectedDocument, setSelectedDocument } = useDocumentStore();
  const { setActiveTour } = useTourStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      setCategory(category);
      setActiveModal(modalName);
    },
    [category, setCategory],
  );

  const categoryMenuList = useCategoryMenuList(category, handleSetModal);
  const categoryCloseModal = () => {
    setActiveModal(null);
    setCategory(null);
  };

  const handleDocumentSetModal = useCallback(
    (modalName: string) => {
      setSelectedDocument(selectedDocument);
      setActiveModal(modalName);
    },
    [selectedDocument, setSelectedDocument],
  );

  const documentMenuList = useDocumentMenuList(selectedDocument, handleDocumentSetModal);
  const documentCloseModal = () => {
    setActiveModal(null);
    setSelectedDocument(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex items-center justify-between px-4 xs:px-0">
          <div className="flex items-center gap-1">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t1 text-primary_normal">لیست اسناد</Typography>
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              className="category-tour flex items-center justify-center rounded-lg bg-transparent p-0 shadow-none"
              onClick={() => {
                setActiveTour(ETourSection.DOCUMENTS);
              }}
            >
              <InfoIcon className="h-5 w-5 stroke-primary-normal" />
            </Button>
          </div>
          <div className="flex gap-2">
            <CategoryDocumentCreateMenu />
            <CategoryListMode />
          </div>
          <div className="flex xs:!hidden">
            <FilterMobileView />
          </div>
        </div>
        <CategoryChildren />
      </div>
      <div className="flex xs:hidden">
        <CategoryDocumentCreateMenu openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <div className="category-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={categoryDrawer}
            setOpenDrawer={setCategoryDrawer}
            menuList={categoryMenuList}
          />
        </div>
        <CategoryDialogs activeModal={activeModal} closeModal={categoryCloseModal} />
        <div className="document-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={documentDrawer}
            setOpenDrawer={setDocumentDrawer}
            menuList={documentMenuList}
          />
        </div>
        <DocumentDialogs activeModal={activeModal} closeModal={documentCloseModal} />
      </div>
    </>
  );
};

export default CategoryList;
