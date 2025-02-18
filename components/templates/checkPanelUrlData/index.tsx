"use client";

import { useEffect, useState } from "react";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useGetCategory from "@hooks/category/useGetCategory";
import useGetDocument from "@hooks/document/useGetDocument";
import { useSearchParams } from "next/navigation";

const CheckPanelUrlData = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const setCategory = useSetRecoilState(categoryAtom);
  const setCategoryShow = useSetRecoilState(categoryShowAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);
  const getSelectedVersion = useRecoilValue(selectedVersionAtom);
  const setShowVersionList = useSetRecoilState(versionModalListAtom);

  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");
  const categoryId = searchParams?.get("categoryId");
  const documentId = searchParams?.get("documentId");

  const { data: getCategory } = useGetCategory(
    +repoId!,
    +categoryId!,
    !!categoryId
  );

  const { data: getDocument } = useGetDocument(
    +repoId!,
    +documentId!,
    !!documentId,
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
    if (documentId && getDocument) {
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
