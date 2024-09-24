"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { repoAtom, repositoryId } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";
import useGetRepo from "@hooks/repository/useGetRepo";
import { selectedDocumentAtom } from "@atom/document";
import useGetDocument from "@hooks/document/useGetDocument";
import useGetUser from "@hooks/auth/useGetUser";
import EditorTab from "@components/organisms/editorTab";
import Error from "@components/organisms/error";
import { Spinner, Typography } from "@material-tailwind/react";

const EditPage = () => {
  const [repositoryAtomId, setRepositoryAtomId] = useRecoilState(repositoryId);
  const setRepository = useSetRecoilState(repoAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);

  const searchParams = useSearchParams();
  const repoId = searchParams.get("repoId");
  const documentId = searchParams.get("documentId");

  const { isFetching } = useGetUser();

  const {
    error: repoError,
    refetch,
    isFetching: isFetchingRepo,
  } = useGetRepo(
    repositoryAtomId ? +repositoryAtomId : null,
    setRepository,
    setRepositoryAtomId
  );

  useEffect(() => {
    if (repoId) {
      setRepositoryAtomId(+repoId);
    }
  }, [repoId]);

  const {
    data: getDocument,
    isLoading: isLoadingDocument,
    error,
  } = useGetDocument(+repoId!, +documentId!, true);

  useEffect(() => {
    if (getDocument) {
      setDocument(getDocument);
    }
  }, [getDocument]);

  if (!repoId || !documentId) {
    return (
      <div className="get-user-info w-full h-screen flex items-center justify-center bg-slate-50">
        <h1 className="font-bold ml-2">سند مورد نظر پیدا نشد</h1>
      </div>
    );
  }

  if (repoError) {
    return (
      <Error
        error={{ message: "خطا در دریافت اطلاعات مخزن" }}
        retry={refetch}
      />
    );
  }

  if (isFetching || isFetchingRepo || isLoadingDocument) {
    return (
      <div className="get-user-info w-full h-screen flex items-center justify-center bg-slate-50">
        <Typography className="font-bold ml-2">لطفا صبر کنید</Typography>
        <Spinner className="h-5 w-5 " color="deep-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="get-user-info w-full h-screen flex items-center justify-center bg-slate-50">
        <Typography className="font-bold ml-2 flex flex-col items-center">
          نسخه ای در سند مورد نظر پیدا نشد
        </Typography>
      </div>
    );
  }

  return <EditorTab />;
};

export default EditPage;
