import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteUser from "@hooks/user/useDeleteUser";
import { useRepositoryStore } from "@store/repository";
import { useUserStore } from "@store/user";
import { toast } from "react-toastify";

const UserDeleteDialog = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { setDeleteUser, selectedUser } = useUserStore();
  const deleteUser = useDeleteUser();

  const handleClose = () => {
    setDeleteUser(false);
  };

  const handleDelete = async () => {
    if (!getRepo || !selectedUser) return;
    deleteUser.mutate({
      repoId: getRepo.id,
      userName: selectedUser.userInfo.userName,
      callBack: () => {
        toast.success(`کاربر ${selectedUser.userInfo.userName} با موفقیت حذف شد.`);
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteUser.isPending}
      setOpen={handleClose}
      onSubmit={handleDelete}
      dialogHeader="حذف کاربر"
      className="repo-user-delete-dialog"
      backToMain
    >
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از حذف"
        <span
          title={selectedUser?.userInfo.userName}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {selectedUser?.userInfo.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default UserDeleteDialog;
