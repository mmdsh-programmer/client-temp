import React from "react";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useCancelPublicVersion from "@hooks/version/useCancelPublicVersion";
import { selectedVersionAtom } from "@atom/version";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCancelPublicDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
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

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    } else if (currentPath === "/admin/sharedDocuments") {
      return getDocument!.repoId;
    } else {
      return getRepo!.id;
    }
  };

  const onSubmit = async () => {
    if (!repoId() || !getVersion) return;
    cancelPublicVersion.mutate({
      repoId: repoId(),
      documentId: getDocument!.id,
      versionId: getVersion.id,
      callBack: () => {
        toast.error(" .تایید نسخه لغو شد");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={cancelPublicVersion.isPending}
      dialogHeader="لغو تایید نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از لغو تایید نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getVersion?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionCancelPublicDialog;
