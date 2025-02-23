import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IPosition } from "@interface/position.interface";
import { useDeletePosition } from "@hooks/position/useDeletePosition";
import { branchIdAtom } from "@atom/branch";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";

interface IProps {
  group: IPosition;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionDeleteDialog = ({ setOpen, group }: IProps) => {
  const getBranchId = useRecoilValue(branchIdAtom);

  const deletePosittion = useDeletePosition();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getBranchId) return;

    deletePosittion.mutate({
      branchId: getBranchId,
      positionName: group.groupPath,
      callBack: () => {
        toast.success(`سمت ${group.groupPath} با موفقیت حذف شد.`);
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deletePosittion.isPending}
      dialogHeader="حذف سمت"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف سمت "
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

export default PositionDeleteDialog;
