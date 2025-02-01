import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { toast } from "react-toastify";
import { IBranch } from "@interface/branch.interface";
import useDeleteBranch from "@hooks/branch/useDeleteBranch";
import useDeleteRepoType from "@hooks/repoType/useDeleteRepoType";

interface IProps {
  branch: IBranch;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const BranchDeleteDialog = ({ setOpen, branch }: IProps) => {
  const deleteBranch = useDeleteBranch();
  const deleteRepoType = useDeleteRepoType();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    deleteBranch.mutate({
      branchId: branch.id,
      callBack: () => {
        // deleteRepoType.mutate({
        //   branchId: branch.
        // })
        toast.success(`شعبه ${branch.title} حذف شد`);
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteBranch.isPending}
      dialogHeader="حذف دسته بندی"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={branch?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {branch?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default BranchDeleteDialog;
