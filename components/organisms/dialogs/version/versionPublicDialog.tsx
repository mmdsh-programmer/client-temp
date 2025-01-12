import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import usePublicVersion from "@hooks/version/usePublicVersion";
import { useRecoilValue } from "recoil";
import { selectedVersionAtom } from "@atom/version";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const VersionPublicDialog = ({
setOpen 
}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const publicVersion = usePublicVersion();

  const form = useForm();
  const {
    handleSubmit, reset, clearErrors 
  } = form;

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
    publicVersion.mutate({
      repoId: repoId(),
      documentId: getDocument!.id,
      versionId: getVersion.id,
      callBack: () => {
        toast.success(" نسخه با موفقیت عمومی شد.");
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
      className="!-mb-[50vh] xs:!mb-0 "
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex">
          آیا از عمومی شدن نسخه "
          <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
            {getVersion?.versionNumber}
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
