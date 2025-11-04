import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useTranferOwnershipRepository from "@hooks/repository/useTransferOwnershipRepository";
import { ERoles } from "@interface/enums";
import { useRepositoryStore } from "@store/repository";
import { useUserStore } from "@store/user";
import { toast } from "react-toastify";

const UserTransferOwnershipDialog = () => {
  const { repo: getRepo, setRepo } = useRepositoryStore();
  const { setTransferOwnership, selectedUser } = useUserStore();
  const transferOwnership = useTranferOwnershipRepository();

  const handleClose = () => {
    setTransferOwnership(false);
  };

  const handleTransfer = async () => {
    if (!getRepo || !selectedUser) return;
    transferOwnership.mutate({
      repoId: getRepo.id,
      userName: selectedUser.userInfo.userName,
      callBack: () => {
        setRepo({
          ...getRepo,
          roleName: ERoles.admin,
        });
        toast.success("انتقال مالکیت با موفقیت انجام شد.");
      },
    });
  };
  
  return (
    <ConfirmDialog
      isPending={transferOwnership.isPending}
      setOpen={handleClose}
      onSubmit={handleTransfer}
      dialogHeader="انتقال مالکیت"
      className="repo-user-transfer-dialog"
      backToMain
    >
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از انتقال مالکیت به کاربر"
        <span
          title={selectedUser?.userInfo.userName}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {selectedUser?.userInfo.name}
        </span>
        " اطمینان دارید؟
      </div>
    </ConfirmDialog>
  );
};

export default UserTransferOwnershipDialog;
