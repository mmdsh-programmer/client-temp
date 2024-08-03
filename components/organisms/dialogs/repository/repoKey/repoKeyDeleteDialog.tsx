import { deleteRepoKeyAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteRepoPublicKey from "@hooks/repository/useDeleteRepoPublicKey";
import { IPublicKey } from "@interface/repo.interface";
import React from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

interface IProps {
  repoId: number;
  setOpen: React.Dispatch<React.SetStateAction<IPublicKey | null>>;
}

const RepoKeyDeleteDialog = ({ setOpen, repoId }: IProps) => {
  const getDeleteRepoKey = useRecoilValue(deleteRepoKeyAtom);

  const deleteRepoKeyHook = useDeleteRepoPublicKey();

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = async () => {
    if (!getDeleteRepoKey)
      return toast.error("مقادیر ورودی برای حذف کلید صحیح نیست");

    deleteRepoKeyHook.mutate({
      repoId,
      keyId: getDeleteRepoKey.id,
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
    >
      {getDeleteRepoKey?.name}
    </DeleteDialog>
  );
};

export default RepoKeyDeleteDialog;
