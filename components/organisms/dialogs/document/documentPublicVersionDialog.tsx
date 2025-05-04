import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import usePublicLastVersion from "@hooks/document/usePublicLastVersion";
import { Typography } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentPublicVersionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const publicVersion = usePublicLastVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !document) return;
    publicVersion.mutate({
      repoId: getRepo?.id,
      documentId: document.id,
      callBack: () => {
        toast.success("آخرین نسخه از سند عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={publicVersion.isPending}
      dialogHeader="عمومی سازی آخرین نسخه سند"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="document-hide-dialog !w-[450px] !min-w-[450px]"
    >
      آیا از عمومی سازی آخرین نسخه سند "
      <Typography
        title={document?.name}
        className="flex cursor-pointer max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
      >
        {document?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentPublicVersionDialog;
