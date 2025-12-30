"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import useGetCategory from "@hooks/category/useGetCategory";
import useGetDocument from "@hooks/document/useGetDocument";
import { useSearchParams } from "next/navigation";
import { useRepositoryStore } from "@store/repository";

const CheckPanelUrlData = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const setCategory = useCategoryStore((state) => {
    return state.setCategory;
  });
  const setCategoryShow = useCategoryStore((state) => {
    return state.setCategoryShow;
  });
  const setDocument = useDocumentStore((state) => {
    return state.setSelectedDocument;
  });
  const setDocumentShow = useDocumentStore((state) => {
    return state.setDocumentShow;
  });
  const getSelectedVersion = useVersionStore((state) => {
    return state.selectedVersion;
  });
  const setShowVersionList = useVersionStore((state) => {
    return state.setVersionModalList;
  });

  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");
  const { repositoryId } = useRepositoryStore();

  const categoryId = searchParams?.get("categoryId");
  const documentId = searchParams?.get("documentId");

  const { data: getCategory } = useGetCategory(+repoId!, +categoryId!, !!categoryId);

  const { data: getDocument, isSuccess } = useGetDocument(
    repositoryId!,
    +documentId!,
    !!documentId,
    !!repositoryId,
    true
  );

  useEffect(() => {
    if (isInitialized || !categoryId || !getCategory) return;
    const categoryData = getCategory;
    setCategory(categoryData);
    setCategoryShow(categoryData);
    setIsInitialized(true);
  }, [getCategory, categoryId]);

  useEffect(() => {
    if (documentId && isSuccess && getDocument) {
      setDocument(getDocument);
      setDocumentShow(getDocument);
      if (!getSelectedVersion) {
        setShowVersionList(true);
      }
    }
  }, [getDocument]);

  return null;
};

export default CheckPanelUrlData;
