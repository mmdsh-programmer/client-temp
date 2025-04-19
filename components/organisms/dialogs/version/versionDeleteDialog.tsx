import { usePathname, useSearchParams } from "next/navigation";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { toast } from "react-toastify";
import useDeleteVersion from "@hooks/version/useDeleteVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDeleteDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

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
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
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
      <div className="flex text-primary_normal font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={getVersion?.versionNumber}
          className="body_b3 text-primary_normal max-w-[100px] truncate flex items-center px-[2px]"
        >
          {getVersion?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default VersionDeleteDialog;
