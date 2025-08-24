import React from "react";
import { useForm } from "react-hook-form";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { toast } from "react-toastify";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useSetLastVersion from "@hooks/version/useSetLastVersion";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LastVersionDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const setLastVersion = useSetLastVersion();

  const form = useForm();
  const { handleSubmit, reset, clearErrors } = form;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!repoId || !getVersion) return;
    setLastVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
      callBack: () => {
        toast.success("به عنوان آخرین نسخه انتخاب شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={setLastVersion.isPending}
      dialogHeader="انتخاب به عنوان آخرین نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="set-last-version-dialog"
    >
      <p>آیا از انتخاب این نسخه به عنوان آخرین نسخه سند اطمینان دارید؟</p>
    </ConfirmDialog>
  );
};

export default LastVersionDialog;
