import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useRepositoryStore } from "@store/repository";
import { useReleaseDocsStore } from "@store/releaseDocs";
import { toast } from "react-toastify";
import useAcceptVersion from "@hooks/release/useAcceptVersion";
import { useForm } from "react-hook-form";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AcceptVersionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getRequest = useReleaseDocsStore((s) => {
    return s.selectedRequest;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });

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
      isDirectAccess: getDocument?.hasDirectAccess,
      callBack: () => {
        toast.success("نسخه با موفقیت عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={acceptRequest.isPending}
      dialogHeader="تایید درخواست عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-accept-public-version-dialog"
    >
      آیا از تایید درخواست عمومی سازی نسخه "
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {getRequest ? getRequest?.versionNumber : getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default AcceptVersionDialog;
