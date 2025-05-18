import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useAcceptPublicDraft from "@hooks/release/useAcceptPublicDraft";
import { selectedVersionAtom } from "@atom/version";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AcceptPublicDraftDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

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
