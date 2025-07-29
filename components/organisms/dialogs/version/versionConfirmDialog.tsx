import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useConfirmVersion from "@hooks/version/useConfirmVersion";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";
import { editorDataAtom, editorModalAtom } from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionConfirmDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const [getSelectedVersion, setSelectedVersion] = useRecoilState(selectedVersionAtom);
  const [getEditorData, setEditorData] = useRecoilState(editorDataAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);

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
      versionId: getSelectedVersion ? getSelectedVersion!.id : editorData!.id,
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
        if (getEditorData) {
          setEditorData(null);
          setSelectedVersion(null);
          setEditorModal(false);
          setVersionModalList(true);
        }
        if (currentPath.includes("/admin/edit")) {
          window.close();
        }
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={confirmVersion.isPending}
      dialogHeader="تایید پیش‌نویس"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-confirm-dialog"
    >
      آیا از تایید پیش‌نویس "
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {(getSelectedVersion || editorData)?.versionNumber}
      </span>
      " اطمینان دارید؟
      {getEditorData ? (
        <Typography className="warning_text mt-6">
          لطفاً قبل از تایید، تغییرات خود را ذخیره کنید. پس از تایید، صفحه ویرایشگر بسته خواهد شد.
        </Typography>
      ) : null}
    </ConfirmDialog>
  );
};

export default VersionConfirmDialog;
