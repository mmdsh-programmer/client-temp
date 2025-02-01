import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { toast } from "react-toastify";
import { IBranch } from "@interface/branch.interface";
import useDeleteBranch from "@hooks/branch/useDeleteBranch";

interface IProps {
  branch: IBranch;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const BranchDeleteDialog = ({ setOpen, branch }: IProps) => {
  const deleteBranch = useDeleteBranch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    deleteBranch.mutate({
      branchId: branch.id,
      parentId: branch.parentId,
      callBack: () => {
        toast.success(`شعبه ${branch.title} حذف شد`);
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteBranch.isPending}
      dialogHeader="حذف شعبه"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={branch?.title}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {branch?.title}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default BranchDeleteDialog;
