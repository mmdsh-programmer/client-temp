import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useDeleteVersion from "@hooks/version/useDeleteVersion";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { selectedVersionAtom } from "@atom/version";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const deleteVerion = useDeleteVersion();

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
    deleteVerion.mutate({
      repoId: repoId(),
      documentId: getDocument!.id,
      versionId: getVersion.id,
      state: getVersion.state,
      callBack: () => {
        toast.error(" نسخه حذف شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteVerion.isPending}
      dialogHeader={getVersion?.state === "draft" ? "حذف پیش نویس" : "حذف نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={getVersion?.versionNumber}
          className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
        >
          {getVersion?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default VersionDeleteDialog;
