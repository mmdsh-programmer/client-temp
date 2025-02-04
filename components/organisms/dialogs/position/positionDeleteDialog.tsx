import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteBranch from "@hooks/branch/useDeleteBranch";

interface IProps {
  group: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionhDeleteDialog = ({ setOpen, group }: IProps) => {
  const deleteBranch = useDeleteBranch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    
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
            title={group?.title}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {group?.title}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default PositionhDeleteDialog;
