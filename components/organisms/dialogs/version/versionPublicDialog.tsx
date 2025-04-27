import { usePathname, useSearchParams } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import usePublicVersion from "@hooks/version/usePublicVersion";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionPublicDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

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
    if (!repoId || !getVersion) return;
    publicVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess: sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
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
      className="version-public-dialog !-mb-[50vh] xs:!mb-0 "
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex">
          آیا از عمومی شدن نسخه "
          <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
            {getVersion?.versionNumber}
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
