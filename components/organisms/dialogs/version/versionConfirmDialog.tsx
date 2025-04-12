import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useConfirmVersion from "@hooks/version/useConfirmVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { selectedVersionAtom } from "@atom/version";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionConfirmDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const confirmVersion = useConfirmVersion();

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
    confirmVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
      callBack: () => {
        toast.success(" نسخه با موفقیت تایید شد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={confirmVersion.isPending}
      dialogHeader="تایید نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-confirm-dialog"
    >
      آیا از تایید نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionConfirmDialog;
