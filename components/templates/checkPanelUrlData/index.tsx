import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useGetCategory from "@hooks/category/useGetCategory";
import useGetDocument from "@hooks/document/useGetDocument";
import { useSetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionListAtom } from "@atom/version";

const CheckPanelUrlData = () => {
  const setCategory = useSetRecoilState(categoryAtom);
  const setCategoryShow = useSetRecoilState(categoryShowAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);
  const setShowVersionList = useSetRecoilState(versionListAtom);

  const searchParams = useSearchParams();
  const repoId = searchParams.get("repoId");
  const categoryId = searchParams.get("categoryId");
  const documentId = searchParams.get("documentId");
  const versionId = searchParams.get("versionId");
  const versionState = searchParams.get("versionState");

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
    if (
      categoryId &&
      documentId &&
      versionId &&
      versionState &&
      getCategory &&
      getDocument
    ) {
      setCategory(getCategory);
      setCategoryShow(getCategory);
      setDocument(getDocument);
      setDocumentShow(getDocument);
      setShowVersionList(true);
    } else if (categoryId && documentId && getCategory && getDocument) {
      setCategory(getCategory);
      setCategoryShow(getCategory);
      setDocument(getDocument);
      setDocumentShow(getDocument);
      setShowVersionList(true);
    } else if (documentId && getDocument) {
      setDocument(getDocument);
      setDocumentShow(getDocument);
      setShowVersionList(true);
    } else if (categoryId && getCategory) {
      setCategory(getCategory);
      setCategoryShow(getCategory);
    }
  }, [getCategory, getDocument]);

  return null;
};

export default CheckPanelUrlData;
