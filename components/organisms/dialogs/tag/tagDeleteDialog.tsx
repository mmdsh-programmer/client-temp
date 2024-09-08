import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteTag from "@hooks/tag/useDeleteTag";
import { selectedTagAtom } from "@atom/tag";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getTag = useRecoilValue(selectedTagAtom);

  const deleteTag = useDeleteTag();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getRepo || !getTag) return;

    deleteTag.mutate({
      repoId: getRepo.id,
      tagId: getTag.id,
      callBack: () => {
        toast.error("تگ حذف شد.");
        handleClose()
      },
    });
  };
  return (
    <DeleteDialog
      isPending={deleteTag.isPending}
      dialogHeader="حذف تگ"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      {getTag?.name}
    </DeleteDialog>
  );
};

export default TagDeleteDialog;
