import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import usePublicLastVersion from "@hooks/document/usePublicLastVersion";
import { Typography } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { editorDataAtom, editorModalAtom } from "@atom/editor";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ConfirmPublicDraftDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const document = useRecoilValue(selectedDocumentAtom);
  const [getSelectedVersion, setSelectedVersion] = useRecoilState(selectedVersionAtom);
  const [getEditorData, setEditorData] = useRecoilState(editorDataAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);

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
      draftId: getSelectedVersion?.id,
      callBack: () => {
        toast.success(" نسخه باموفقیت تایید و عمومی شد.");
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
      {getEditorData ? (
        <Typography className="warning_text mt-6">
          لطفاً قبل از تایید، تغییرات خود را ذخیره کنید. پس از تایید، صفحه ویرایشگر بسته خواهد شد.
        </Typography>
      ) : null}
    </ConfirmDialog>
  );
};

export default ConfirmPublicDraftDialog;
