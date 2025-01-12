import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteTag from "@hooks/tag/useDeleteTag";
import { selectedTagAtom } from "@atom/tag";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getTag = useRecoilValue(selectedTagAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const deleteTag = useDeleteTag();

  const handleClose = () => {
    setOpen(false);
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    } else if (currentPath === "/admin/sharedDocuments" && getDocument) {
      return getDocument!.repoId;
    } else {
      return getRepo!.id;
    }
  };
  

  const handleDelete = async () => {
    if (!repoId() || !getTag) return;
    deleteTag.mutate({
      repoId: repoId(),
      tagId: getTag.id,
      callBack: () => {
        toast.error("تگ حذف شد.");
        handleClose();
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
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={getTag?.name}
          className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
        >
          {getTag?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default TagDeleteDialog;
