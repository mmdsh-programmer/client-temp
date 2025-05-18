import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { toast } from "react-toastify";
import useAcceptVersion from "@hooks/release/useAcceptVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { selectedVersionAtom } from "@atom/version";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectDraft = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  
  const acceptRequest = useAcceptVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    acceptRequest.mutate({
      repoId: getRepo.id,
      docId: getRequest ? getRequest?.documentId : getDocument!.id,
      versionId: getRequest ? getRequest.id : getVersion!.id,
      callBack: () => {
        toast.success("نسخه با موفقیت عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={acceptRequest.isPending}
      dialogHeader=" عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-accept-public-version-dialog"
    >
      آیا از عمومی سازی نسخه "
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {getRequest ? getRequest?.versionNumber : getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RejectDraft;
