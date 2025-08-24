import { usePathname, useSearchParams } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { toast } from "react-toastify";
import useCancelConfirmVersion from "@hooks/version/useCancelConfirmVersion";
import { useForm } from "react-hook-form";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCancelConfirmDialog = ({ setOpen }: IProps) => {
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
  const cancelConfirmVersion = useCancelConfirmVersion();

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
    cancelConfirmVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
      callBack: () => {
        toast.error(" .تایید نسخه لغو شد");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={cancelConfirmVersion.isPending}
      dialogHeader="لغو تایید نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-cancel-confirm-dialog"
    >
      آیا از لغو تایید نسخه "
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionCancelConfirmDialog;
