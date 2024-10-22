import React, { useState } from "react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import DocumentTagManagement from "@components/organisms/document/documentTagManagement";
import TagCreateDialog from "../tag/tagCreateDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentAccessDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);

  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");

  const editDocument = useEditDocument();

  const handleClose = () => {
    setOpen(false);
    setTempDocTag([]);
  };

  const handleSubmit = async () => {
    if (!getRepo || !document) return;
    if (!getTempDocTag) return;
    editDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag.map((tag) => {
        return tag.id;
      }),
      callBack: () => {
        toast.success("تگ‌ها با موفقیت به سند اضافه شدند.");
      },
    });
  };

  if (openCreateTagDialog) {
    return (
      <TagCreateDialog
        name={tagName}
        setOpen={() => {
          return setOpenCreateTagDialog(false);
        }}
      />
    );
  }

  return (
    <ConfirmFullHeightDialog
      dialogHeader="تگ‌های سند"
      setOpen={handleClose}
      className="min-h-[350px]"
      isPending={editDocument.isPending}
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col gap-5">
        <DocumentTagManagement
          setTagName={setTagName}
          setOpen={setOpenCreateTagDialog}
        />
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentAccessDialog;
