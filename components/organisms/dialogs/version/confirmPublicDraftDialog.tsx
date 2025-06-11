import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import usePublicLastVersion from "@hooks/document/usePublicLastVersion";
import { Typography } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import { selectedVersionAtom } from "@atom/version";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ConfirmPublicDraftDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const document = useRecoilValue(selectedDocumentAtom);
  const [getSelectedVersion, setSelectedVersion] = useRecoilState(selectedVersionAtom);

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();
  const publicVersion = usePublicLastVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
    setSelectedVersion(null);
  };

  const onSubmit = async () => {
    if (!repoId || !document) return;
    publicVersion.mutate({
      repoId,
      documentId: document.id,
      isDirectAccess:
        currentPath === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId,
      draftId: getSelectedVersion?.id,
      callBack: () => {
        toast.success(" نسخه باموفقیت تایید و عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={publicVersion.isPending}
      dialogHeader="تایید و عمومی سازی پیش نویس"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-confirm-public-dialog"
    >
      آیا از تایید و عمومی سازی پیش نویس"
      <Typography
        title={getSelectedVersion?.versionNumber}
        className="flex max-w-[100px] cursor-pointer items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
      >
        {getSelectedVersion?.versionNumber}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default ConfirmPublicDraftDialog;
