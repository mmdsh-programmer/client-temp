import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import LoadingButton from "@components/molecules/loadingButton";
import DocumentTagManagement from "@components/organisms/document/documentTagManagement";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";

const EditorTags = () => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const getTempDocTag = useRecoilValue(tempDocTagAtom);

  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const editDocument = useEditDocument();

  const handleSubmit = async () => {
    if (!getRepo || !document) return;
    if (!getTempDocTag) return;
    editDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag,
      callBack: () => {
        toast.success("تگ‌ها با موفقیت به سند اضافه شدند.");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full justify-between gap-5 px-6 py-4"
    >
      <DocumentTagManagement setTagName={setTagName} setOpen={setOpenCreateTagDialog}/>
      {adminRole ? (
        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit}
          loading={editDocument.isPending}
        >
          <Typography className="text__label__button text-white">
            ارسال
          </Typography>
        </LoadingButton>
      ) : null}
      {openCreateTagDialog ? (
        <TagCreateDialog
          name={tagName}
          setOpen={() => {
            return setOpenCreateTagDialog(false);
          }}
        />
      ) : null}
    </form>
  );
};

export default EditorTags;
