import { usePathname, useSearchParams } from "next/navigation";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useTagStore } from "@store/tag";
import { toast } from "react-toastify";
import useDeleteDomainTag from "@hooks/domainTags/useDeleteDomainTag";
import useDeleteTag from "@hooks/tag/useDeleteTag";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getTag = useTagStore((s) => {
    return s.selectedTag;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });

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
    if ((currentPath === "/admin/sharedDocuments" || sharedDocuments === "true") && getDocument) {
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
      isDirectAccess: currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
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
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از حذف"
        <span
          title={getTag?.name}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {getTag?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default TagDeleteDialog;
