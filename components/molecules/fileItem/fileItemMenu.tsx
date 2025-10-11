import React, { SetStateAction } from "react";
import { DeleteIcon, GlobeIcon } from "@components/atoms/icons";
import MenuTemplate from "@components/templates/menuTemplate";
import useRepoId from "@hooks/custom/useRepoId";
import { useDocumentStore } from "@store/document";
import useDeleteFile from "@hooks/files/useDeleteFile";
import { IFile } from "cls-file-management";
import usePublicFile from "@hooks/files/usePublicFile";
import { toast } from "react-toastify";

interface IProps {
  file: IFile;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const FileItemMenu = ({ file, setIsLoading }: IProps) => {
  const repoId = useRepoId();
  const { selectedDocument: getDocument } = useDocumentStore();

  const deleteFile = useDeleteFile();
  const publicFile = usePublicFile();

  const handleDeleteFile = () => {
    setIsLoading(true);
    if (getDocument && repoId) {
      deleteFile.mutate({
        repoId,
        resourceId: getDocument.id,
        fileHash: file.hash,
        type: "private",
        userGroupHash: getDocument.attachmentUserGroup || "",
        callBack: () => {
          toast.success("فایل با موفقیت حذف شد.");
          setIsLoading(false);
        },
      });
    }
  };

  const handlePublicFile = () => {
    setIsLoading(true);
    if (getDocument && repoId) {
      publicFile.mutate({
        resourceId: getDocument.id,
        fileHash: file.hash,
        userGroupHash: getDocument.attachmentUserGroup || "",
        callBack: () => {
          toast.success("فایل با موفقیت عمومی شد.");
          setIsLoading(false);
        },
      });
    }
  };

  const menuList = [
    {
      text: "حذف فایل",
      onClick: () => {
        handleDeleteFile();
      },
      className: "file-delete",
      icon: <DeleteIcon className="h-4 w-4 fill-icon-active" />,
    },
    {
      text: "عمومی سازی",
      onClick: () => {
        handlePublicFile();
      },
      className: "file-public",
      icon: <GlobeIcon className="h-4 w-4 fill-icon-active" />,
    },
  ];
  return (
    <MenuTemplate onMobileClick={() => {}} menuList={menuList} className="document-file-menu" />
  );
};

export default FileItemMenu;
