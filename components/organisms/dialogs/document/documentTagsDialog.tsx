import React, { useState } from "react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import DocumentTagManagement from "@components/organisms/document/documentTagManagement";
import TagCreateDialog from "../tag/tagCreateDialog";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import useSetDocumentDomainTags from "@hooks/domainTags/useSetDocumentDomainTags";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentTagsDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const document = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);

  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const setDocumentTags = useSetDocumentDomainTags();
  const editDocument = useEditDocument();

  const handleClose = () => {
    setOpen(false);
    setTempDocTag([]);
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
      isDirectAccess:
      sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
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
      isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
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
      className="document-tags-dialog min-h-[350px]"
      isPending={editDocument.isPending || setDocumentTags.isPending}
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

export default DocumentTagsDialog;
