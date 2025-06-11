import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import usePublicLastVersion from "@hooks/document/usePublicLastVersion";
import { Typography } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentPublicVersionDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const document = useRecoilValue(selectedDocumentAtom);

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();
  const publicVersion = usePublicLastVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!repoId || !document) return;
    publicVersion.mutate({
      repoId,
      documentId: document.id,
      isDirectAccess:
        currentPath === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId,
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
      className="document-public-dialog"
    >
      آیا از عمومی سازی آخرین نسخه سند "
      <Typography
        title={document?.name}
        className="flex max-w-[100px] cursor-pointer items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
      >
        {document?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentPublicVersionDialog;
