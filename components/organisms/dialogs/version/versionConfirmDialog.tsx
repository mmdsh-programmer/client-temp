import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useConfirmVersion from "@hooks/version/useConfirmVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";
import { editorDataAtom } from "@atom/editor";
import { selectedVersionAtom } from "@atom/version";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionConfirmDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
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
    if (!repoId) return;
    confirmVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion ? getVersion!.id : editorData!.id,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
      callBack: () => {
        if (getRepo?.roleName === ERoles.owner || getRepo?.roleName === ERoles.admin) {
          toast.success("نسخه با موفقیت تایید شد.");
        } else {
          toast.success("درخواست تایید نسخه برای مدیر ارسال شد.");
        }
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
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {(getVersion || editorData)?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionConfirmDialog;
