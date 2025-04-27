import React, { useState } from "react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { usePathname, useSearchParams } from "next/navigation";
import DocumentTagManagement from "@components/organisms/document/documentTagManagement";
import LoadingButton from "@components/molecules/loadingButton";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import useSetDocumentDomainTags from "@hooks/domainTags/useSetDocumentDomainTags";

const EditorTags = () => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const getTempDocTag = useRecoilValue(tempDocTagAtom);
  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");

  const { data: userInfo } = useGetUser();
  const editDocument = useEditDocument();
  const setDocumentTags = useSetDocumentDomainTags();

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");
  const repoId = useRepoId();

  const adminOrOwnerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (currentPath === "/admin/sharedDocuments" || sharedDocuments === "true") {
      return document?.accesses?.[0] === "admin" || document?.accesses?.[0] === "owner";
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const handleSubmit = async () => {
    if (!repoId || !document) return;
    if (!getTempDocTag) return;
    if (getTempDocTag.length > 10) {
      toast.error("بیش از ده آیتم نمی‌توانید به سند منصوب کنید.");
      return;
    }
    if (userInfo?.domainConfig.useDomainTag) {
      return setDocumentTags.mutate({
        repoId,
        documentId: document.id,
        tagIds: getTempDocTag.map((tag) => {
          return tag.id;
        }),
        isDirectAccess: sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      });
    }
    editDocument.mutate({
      repoId,
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag.map((tag) => {
        return tag.id;
      }),
      isDirectAccess: sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      callBack: () => {
        toast.success("تگ‌ها با موفقیت به سند اضافه شدند.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between gap-5 px-6 py-4">
      <DocumentTagManagement setTagName={setTagName} setOpen={setOpenCreateTagDialog} />
      {adminOrOwnerRole() ? (
        <LoadingButton
          className="!w-full bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={handleSubmit}
          loading={editDocument.isPending}
        >
          <Typography className="text__label__button text-white">ارسال</Typography>
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
