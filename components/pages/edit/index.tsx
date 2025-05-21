"use client";

import React, { useEffect } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";

import EditorTab from "@components/organisms/editorTab";
import { selectedDocumentAtom } from "@atom/document";
import useGetDocument from "@hooks/document/useGetDocument";
import { useRecoilState } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";

const EditPage = () => {
  const currentPath = usePathname();
  const [getSelectedDocument, setDocument] =
    useRecoilState(selectedDocumentAtom);

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
    true
  );

  useEffect(() => {
    if (getDocument) {
      setDocument(getDocument);
    }
  }, [getDocument]);

  if (!documentId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="font-bold ml-2">سند مورد نظر پیدا نشد</h1>
      </div>
    );
  }

  if (isFetchingDocument) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Typography className="font-bold ml-2">لطفا صبر کنید</Typography>
        <Spinner className="h-5 w-5 " color="deep-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Typography className="font-bold ml-2 flex flex-col items-center">
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
