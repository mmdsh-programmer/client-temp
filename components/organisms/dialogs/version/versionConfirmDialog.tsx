import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import useConfirmVersion from "@hooks/version/useConfirmVersion";
import { useForm } from "react-hook-form";
import { useRepositoryStore } from "@store/repository";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import useRepoId from "@hooks/custom/useRepoId";

import { ERoles } from "@interface/enums";

import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionConfirmDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const editorData = useEditorStore((s) => {
    return s.editorData;
  });
  const getSelectedVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const setSelectedVersion = useVersionStore((s) => {
    return s.setSelectedVersion;
  });
  const setEditorData = useEditorStore((s) => {
    return s.setEditorData;
  });
  const setEditorModal = useEditorStore((s) => {
    return s.setEditorModal;
  });
  const getVersionModalList = useVersionStore((s) => {
    return s.versionModalList;
  });
  const setVersionModalList = useVersionStore((s) => {
    return s.setVersionModalList;
  });

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
        if (!getVersionModalList && currentPath.includes("/admin/edit")) {
          window.close();
        }
        if (!getVersionModalList) {
          setEditorData(null);
          setSelectedVersion(null);
          setEditorModal(false);
          setVersionModalList(true);
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
      {!getVersionModalList ? (
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text mt-6">
          لطفاً قبل از تایید، تغییرات خود را ذخیره کنید. پس از تایید، صفحه ویرایشگر بسته خواهد شد.
        </Typography>
      ) : null}
    </ConfirmDialog>
  );
};

export default VersionConfirmDialog;
