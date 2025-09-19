"use client";

import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";
import EditorTab from "@components/organisms/editorTab";
import useGetDocument from "@hooks/document/useGetDocument";
import useRepoId from "@hooks/custom/useRepoId";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";

const EditPage = () => {
  const currentPath = usePathname();
  const { selectedDocument: getSelectedDocument, setSelectedDocument: setDocument } =
    useDocumentStore();

  const repoId = useRepoId();

  const searchParams = useSearchParams();
  const documentId = searchParams?.get("documentId");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const {
    data: getDocument,
    isFetching: isFetchingDocument,
    error,
  } = useGetDocument(
    repoId!,
    +documentId!,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true,
    true,
  );

  useEffect(() => {
    if (getDocument) {
      setDocument(getDocument);
    }
  }, [getDocument]);

  if (!documentId) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="ml-2 font-bold">سند مورد نظر پیدا نشد</h1>
      </div>
    );
  }

  if (isFetchingDocument) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="ml-2 font-bold">
          لطفا صبر کنید
        </Typography>
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="ml-2 flex flex-col items-center font-bold"
        >
          نسخه ای در سند مورد نظر پیدا نشد
        </Typography>
      </div>
    );
  }

  if (getSelectedDocument) {
    return <EditorTab />;
  }

  return null;
};

export default EditPage;
