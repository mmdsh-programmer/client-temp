import React from "react";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useSetLastVersion from "@hooks/version/useSetLastVersion";
import { selectedVersionAtom } from "@atom/version";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LastVersionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const setLastVersion = useSetLastVersion();

  const form = useForm();
  const { handleSubmit, reset, clearErrors } = form;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return getDocument!.repoId;
    }
    return getRepo!.id;
  };

  const onSubmit = async () => {
    if (!repoId() || !getVersion) return;
    setLastVersion.mutate({
      repoId: repoId(),
      documentId: getDocument!.id,
      versionId: getVersion.id,
      isDirectAccess:
      currentPath === "/admin/sharedDocuments" ? true : undefined,
      callBack: () => {
        toast.success("به عنوان آخرین نسخه انتخاب شد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={setLastVersion.isPending}
      dialogHeader="انتخاب به عنوان آخرین نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <p>آیا از انتخاب این نسخه به عنوان آخرین نسخه سند اطمینان دارید؟</p>
    </ConfirmDialog>
  );
};

export default LastVersionDialog;
