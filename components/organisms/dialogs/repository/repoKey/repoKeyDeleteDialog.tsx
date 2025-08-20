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

const RepoKeyDeleteDialog = ({
 setOpen, repoId 
}: IProps) => {
  const { deleteRepoKey } = useDeleteRepoKeyStore();

  const deleteRepoKeyHook = useDeleteRepoPublicKey();

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = async () => {
    if (!deleteRepoKey)
      return toast.error("مقادیر ورودی برای حذف کلید صحیح نیست");

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
      {deleteRepoKey?.name}
    </DeleteDialog>
  );
};

export default RepoKeyDeleteDialog;
