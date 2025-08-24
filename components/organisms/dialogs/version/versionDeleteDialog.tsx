import { usePathname, useSearchParams } from "next/navigation";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { toast } from "react-toastify";
import useDeleteVersion from "@hooks/version/useDeleteVersion";
import { useForm } from "react-hook-form";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDeleteDialog = ({ setOpen }: IProps) => {
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
  const deleteVerion = useDeleteVersion();

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
    deleteVerion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      state: getVersion.state,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
      callBack: () => {
        toast.success(" نسخه حذف شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteVerion.isPending}
      dialogHeader={getVersion?.state === "draft" ? "حذف پیش نویس" : "حذف نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-delete-dialog"
    >
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از حذف"
        <span
          title={getVersion?.versionNumber}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {getVersion?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default VersionDeleteDialog;
