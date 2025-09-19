import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import ChildrenTree from "@components/organisms/childrenTree";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { IRemoteEditorRef } from "clasor-remote-editor";
import LoadHtml from "./loadHtml";
import { Typography } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateContentDialog = ({ setOpen, editorRef }: IProps) => {
  // TODO CODE REVIEW REQUIRED

  const [loading, setLoading] = useState(false);
  const getDocumentTemplate = useDocumentStore((s) => {
    return s.documentTemplate;
  });
  const setDocumentTemplate = useDocumentStore((s) => {
    return s.setDocumentTemplate;
  });

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();

  const handleClose = () => {
    setOpen(false);
    setDocumentTemplate(null);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
  };

  return (
    <ConfirmFullHeightDialog
      dialogHeader="انتخاب نمونه سند"
      isPending={loading}
      setOpen={handleClose}
      onSubmit={handleSubmit}
      disabled={!getDocumentTemplate}
    >
      {currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" &&
        userInfo?.repository.id !== getDocumentTemplate?.repoId) ? (
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t3 text-primary_normal">
          شما به نمونه‌ سندهای این منبع دسترسی ندارید.
        </Typography>
      ) : (
        <>
          <ChildrenTree move={false} enableAction={false} />
          {loading ? <LoadHtml handleClose={handleClose} editorRef={editorRef} /> : null}
        </>
      )}
    </ConfirmFullHeightDialog>
  );
};

export default TemplateContentDialog;
