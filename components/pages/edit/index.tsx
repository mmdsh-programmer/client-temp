"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { repoAtom } from "@atom/repository";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import useGetDocument from "@hooks/document/useGetDocument";
import useGetUser from "@hooks/auth/useGetUser";
import EditorTab from "@components/organisms/editorTab";
import { Spinner, Typography } from "@material-tailwind/react";

const EditPage = () => {
  const currentPath = usePathname();

  const getRepo = useRecoilValue(repoAtom);
  const [getSelectedDocument, setDocument] =
    useRecoilState(selectedDocumentAtom);

  const searchParams = useSearchParams();
  const documentId = searchParams.get("documentId");
  const getRepoId = searchParams.get("repoId");
  const sharedDocuments = searchParams.get("sharedDocuments");

  const { data: userInfo, isFetching } = useGetUser();

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return getSelectedDocument!.repoId;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    return getRepo!.id;
  };

  const {
    data: getDocument,
    isFetching: isFetchingDocument,
    error,
  } = useGetDocument(
    repoId(),
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

  if (isFetching || isFetchingDocument) {
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
