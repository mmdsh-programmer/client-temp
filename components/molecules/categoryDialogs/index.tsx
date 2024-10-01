import React from "react";
import CategoryAccessDialog from "@components/organisms/dialogs/category/categoryAccessDialog";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import CategoryDeleteDialog from "@components/organisms/dialogs/category/categoryDeleteDialog";
import CategoryEditDialog from "@components/organisms/dialogs/category/categoryEditDialog";
import CategoryHideDialog from "@components/organisms/dialogs/category/categoryHideDialog";
import CategoryMoveDialog from "@components/organisms/dialogs/category/categoryMoveDialog";
import CategoryVisibleDialog from "../../organisms/dialogs/category/categoryVisibleDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";

interface CategoryDialogsProps {
  modals: {
    editCategoryModal: boolean;
    deleteCategoryModal: boolean;
    moveModal: boolean;
    hideModal: boolean;
    visibleModal: boolean;
    categoryAccessModal: boolean;
    createCategoryModal: boolean;
    createDocumentModal: boolean;
    createTemplateModal: boolean;
  };
  toggleModal: (
    modalName: keyof CategoryDialogsProps["modals"],
    value: boolean
  ) => void;
}

const CategoryDialogs = ({ modals, toggleModal }: CategoryDialogsProps) => {
  return (
    <>
      {modals.editCategoryModal ? (
        <CategoryEditDialog
          setOpen={() => {
            return toggleModal("editCategoryModal", false);
          }}
        />
      ) : null}
      {modals.deleteCategoryModal ? (
        <CategoryDeleteDialog
          setOpen={() => {
            return toggleModal("deleteCategoryModal", false);
          }}
        />
      ) : null}
      {modals.moveModal ? (
        <CategoryMoveDialog
          setOpen={() => {
            return toggleModal("moveModal", false);
          }}
        />
      ) : null}
      {modals.hideModal ? (
        <CategoryHideDialog
          setOpen={() => {
            return toggleModal("hideModal", false);
          }}
        />
      ) : null}
      {modals.visibleModal ? (
        <CategoryVisibleDialog
          setOpen={() => {
            return toggleModal("visibleModal", false);
          }}
        />
      ) : null}
      {modals.createCategoryModal ? (
        <CategoryCreateDialog
          setOpen={() => {
            return toggleModal("createCategoryModal", false);
          }}
        />
      ) : null}
      {modals.createDocumentModal ? (
        <DocumentCreate
          isTemplate={false}
          setOpen={() => {
            return toggleModal("createDocumentModal", false);
          }}
        />
      ) : null}
      {modals.createTemplateModal ? (
        <DocumentCreate
          isTemplate
          setOpen={() => {
            return toggleModal("createTemplateModal", false);
          }}
        />
      ) : null}
      {modals.categoryAccessModal ? (
        <CategoryAccessDialog
          setOpen={() => {
            return toggleModal("categoryAccessModal", false);
          }}
        />
      ) : null}
    </>
  );
};

export default CategoryDialogs;
