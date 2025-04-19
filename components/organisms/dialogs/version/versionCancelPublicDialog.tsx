import { usePathname, useSearchParams } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { toast } from "react-toastify";
import useCancelPublicVersion from "@hooks/version/useCancelPublicVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCancelPublicDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const cancelPublicVersion = useCancelPublicVersion();

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
    cancelPublicVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      callBack: () => {
        toast.error(" .عمومی سازی نسخه لغو شد");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={cancelPublicVersion.isPending}
      dialogHeader="لغو عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-cancel-public-dialog"
    >
      آیا از لغو عمومی سازی نسخه "
      <span className="text-primary_normal max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionCancelPublicDialog;
