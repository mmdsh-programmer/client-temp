import { usePathname, useSearchParams } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import usePublicVersion from "@hooks/version/usePublicVersion";
import useRepoId from "@hooks/custom/useRepoId";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionPublicDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const editorData = useEditorStore((s) => {
    return s.editorData;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const publicVersion = usePublicVersion();

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
    publicVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion ? getVersion!.id : editorData!.id,
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
      callBack: () => {
        if (getRepo?.roleName === ERoles.owner) {
          toast.success("نسخه با موفقیت عمومی شد.");
        } else {
          toast.success("درخواست عمومی سازی نسخه برای مالک ارسال شد.");
        }
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={publicVersion.isPending}
      dialogHeader="عمومی شدن نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-public-dialog !-mb-[50dvh] xs:!mb-0"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex">
          آیا از عمومی شدن نسخه "
          <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
            {(getVersion || editorData)?.versionNumber}
          </span>
          " اطمینان دارید؟
        </div>
        <span className="text-[11px] text-secondary">
          درصورت عمومی شدن این نسخه تمامی محتوای استفاده شده در آن (شامل ویدیو عکس و...) نیز به صورت
          عمومی در دسترس خواهد بود.
        </span>
      </div>
    </ConfirmDialog>
  );
};

export default VersionPublicDialog;
