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
import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

const EditorTags = () => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const getTempDocTag = useRecoilValue(tempDocTagAtom);
  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams.get("sharedDocuments");

  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true"
    ) {
      return (
        document?.accesses?.[0] === "admin" ||
        document?.accesses?.[0] === "owner"
      );
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true"
    ) {
      return document!.repoId;
    }
    return getRepo!.id;
  };

  const editDocument = useEditDocument();

  const handleSubmit = async () => {
    if (!repoId() || !document) return;
    if (!getTempDocTag) return;
    if (getTempDocTag.length > 10) {
      toast.error("بیش از ده آیتم نمی‌توانید به سند منصوب کنید.");
      return;
    }
    editDocument.mutate({
      repoId: repoId(),
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag.map((tag) => {
        return tag.id;
      }),
      isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
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
      <DocumentTagManagement
        setTagName={setTagName}
        setOpen={setOpenCreateTagDialog}
      />
      {adminOrOwnerRole() ? (
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
