import React from "react";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { IVersion } from "@interface/version.interface";
import usePublicVersion from "@hooks/version/usePublicVersion";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  version: IVersion;
}

const VersionPublicDialog = ({ version, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const publicVersion = usePublicVersion();

  const form = useForm();

  const { register, handleSubmit, reset, clearErrors, formState } = form;
  const { errors } = formState;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    publicVersion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionId: version.id,
      callBack: () => {
        toast.success(" نسخه با موفقیت عمومی شد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={publicVersion.isPending}
      dialogHeader={"عمومی شدن نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="!-mb-[50vh] xs:!mb-0 "
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex">
          آیا از عمومی شدن نسخه "
          <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
            {version?.versionNumber}
          </span>
          " اطمینان دارید؟
        </div>
        <span className="text-[11px] text-secondary">
          درصورت عمومی شدن این نسخه تمامی محتوای استفاده شده در آن (شامل ویدیو
          عکس و...) نیز به صورت عمومی در دسترس خواهد بود.
        </span>
      </div>
    </ConfirmDialog>
  );
};

export default VersionPublicDialog;
