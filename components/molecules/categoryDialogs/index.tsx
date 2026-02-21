import React from "react";
import CategoryAccessDialog from "@components/organisms/dialogs/category/categoryAccessDialog";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import CategoryDeleteDialog from "@components/organisms/dialogs/category/categoryDeleteDialog";
import CategoryEditDialog from "@components/organisms/dialogs/category/categoryEditDialog";
import CategoryHideDialog from "@components/organisms/dialogs/category/categoryHideDialog";
import CategoryMoveDialog from "@components/organisms/dialogs/category/categoryMoveDialog";
import CategoryVisibleDialog from "@components/organisms/dialogs/category/categoryVisibleDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";

interface ICategoryDialogsProps {
  activeModal: string | null;
  closeModal: () => void;
}

const CategoryDialogs = ({ activeModal, closeModal }: ICategoryDialogsProps) => {
  if (!activeModal) return null;

  return (
    <>
      {activeModal === "editCategory" ? <CategoryEditDialog setOpen={closeModal} /> : null}
      {activeModal === "deleteCategory" ? <CategoryDeleteDialog setOpen={closeModal} /> : null}
      {activeModal === "move" ? <CategoryMoveDialog setOpen={closeModal} /> : null}
      {activeModal === "hide" ? <CategoryHideDialog setOpen={closeModal} /> : null}
      {activeModal === "visible" ? <CategoryVisibleDialog setOpen={closeModal} /> : null}
      {activeModal === "createCategory" ? <CategoryCreateDialog setOpen={closeModal} /> : null}
      {activeModal === "createDocument" ? (
        <DocumentCreate isTemplate={false} setOpen={closeModal} />
      ) : null}
      {activeModal === "createTemplate" ? <DocumentCreate isTemplate setOpen={closeModal} /> : null}
      {activeModal === "accessCategory" ? <CategoryAccessDialog setOpen={closeModal} /> : null}
    </>
  );
};

export default CategoryDialogs;
