import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { selectedTagAtom } from "@atom/tag";
import { toast } from "react-toastify";
import useDeleteTag from "@hooks/tag/useDeleteTag";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";
import useDeleteDomainTag from "@hooks/domainTags/useDeleteDomainTag";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getTag = useRecoilValue(selectedTagAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const deleteTag = useDeleteTag();
  const deleteDomainTag = useDeleteDomainTag();

  const handleClose = () => {
    setOpen(false);
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (
      (currentPath === "/admin/sharedDocuments" ||
        sharedDocuments === "true") &&
      getDocument
    ) {
      return getDocument!.repoId;
    }
    return getRepo!.id;
  };

  const handleDelete = async () => {
    if (userInfo?.domainConfig.useDomainTag && getTag) {
      return deleteDomainTag.mutate({
        tagId: getTag.id,
        callBack: () => {
          handleClose();
        },
      });
    }
    if (!repoId() || !getTag) return;
    deleteTag.mutate({
      repoId: repoId(),
      tagId: getTag.id,
      isDirectAccess:
        currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
      callBack: () => {
        toast.error("تگ حذف شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteTag.isPending || deleteDomainTag.isPending}
      dialogHeader="حذف تگ"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className="tag-delete-dialog"
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
