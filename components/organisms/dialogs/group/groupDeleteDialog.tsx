import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedGroupAtom } from "@atom/group";
import { toast } from "react-toastify";
import useDeleteGroup from "@hooks/group/useDeleteGroup";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const group = useRecoilValue(selectedGroupAtom);
  const { isPending, mutate } = useDeleteGroup();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getRepo || !group) return;

    mutate({
      repoId: getRepo.id,
      title: group?.title,
      callBack: () => {
        toast.error("گروه حذف شد.");
        handleClose();
      },
    });
  };
  return (
    <DeleteDialog
      isPending={isPending}
      setOpen={handleClose}
      onSubmit={handleDelete}
      dialogHeader="حذف گروه"
      className="repo-group-delete-dialog"
    >
      <div className="flex text-primary_normal font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={group?.title}
          className="body_b3 text-primary_normal max-w-[100px] truncate flex items-center px-[2px]"
        >
          {group?.title}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default GroupDeleteDialog;
