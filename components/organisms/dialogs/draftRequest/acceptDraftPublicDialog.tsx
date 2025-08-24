import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useRepositoryStore } from "@store/repository";
import { useReleaseDocsStore } from "@store/releaseDocs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAcceptPublicDraft from "@hooks/release/useAcceptPublicDraft";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AcceptPublicDraftDialog = ({ setOpen }: IProps) => {
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

  const acceptPublicDraft = useAcceptPublicDraft();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    acceptPublicDraft.mutate({
      repoId: getRepo.id,
      docId: getRequest ? getRequest?.documentId : getDocument!.id,
      draftId: getRequest ? getRequest.id : getVersion!.id,
      callBack: () => {
        toast.success("پیش‌نویس با موفقیت تایید و عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={acceptPublicDraft.isPending}
      dialogHeader="تایید و عمومی سازی پیش نویس"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-accept-public-draft-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
    >
      آیا از تایید و عمومی سازی پیش نویس "
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {getRequest ? getRequest?.versionNumber : getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default AcceptPublicDraftDialog;
