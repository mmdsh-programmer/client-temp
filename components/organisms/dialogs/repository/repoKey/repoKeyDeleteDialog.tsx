import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IPublicKey } from "@interface/repo.interface";
import { toast } from "react-toastify";
import useDeleteRepoPublicKey from "@hooks/repository/useDeleteRepoPublicKey";
import { useDeleteRepoKeyStore } from "@store/repository";

interface IProps {
  repoId: number;
  setOpen: React.Dispatch<React.SetStateAction<IPublicKey | null>>;
}

const RepoKeyDeleteDialog = ({ setOpen, repoId }: IProps) => {
  const { deleteRepoKey } = useDeleteRepoKeyStore();

  const deleteRepoKeyHook = useDeleteRepoPublicKey();

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = async () => {
    if (!deleteRepoKey) return toast.error("مقادیر ورودی برای حذف کلید صحیح نیست");

    deleteRepoKeyHook.mutate({
      repoId,
      keyId: deleteRepoKey.id,
      callBack: () => {
        toast.success("کلید با موفقیت حذف شد");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteRepoKeyHook.isPending}
      setOpen={handleClose}
      onSubmit={handleDelete}
      dialogHeader="حذف کلید"
      className="repo-key-delete-dialog"
    >
      <div className="flex flex-wrap font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از حذف"
        <span
          title={deleteRepoKey?.name}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {deleteRepoKey?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default RepoKeyDeleteDialog;
