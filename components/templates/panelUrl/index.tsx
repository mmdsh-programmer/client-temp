"use client";

import { useEffect } from "react";
import { categoryShow } from "atom/category";
import { repoAtom } from "atom/repository";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "atom/document";

const PanelURl = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryShow);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  useEffect(() => {
    if (getDocument && getCategory && getRepo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${getRepo.id}&categoryId=${getCategory?.id}&documentId=${getDocument.id}`,
      );
    } else if (getCategory && getRepo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${getRepo.id}&categoryId=${getCategory?.id}`,
      );
    } else if (getDocument && getRepo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${getRepo.id}&documentId=${getDocument.id}`,
      );
    } else if (getRepo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${getRepo.id}`,
      );
    }
    if (window.location.pathname === "/admin/dashboard") {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}`,
      );
    }
  }, [getDocument, getCategory, getRepo]);

  return null;
};

export default PanelURl;
