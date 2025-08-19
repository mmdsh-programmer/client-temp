"use client";

import { useEffect } from "react";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

const PanelUrl = () => {
  const { repo } = useRepositoryStore();
  const { categoryShow } = useCategoryStore();
  const { documentShow } = useDocumentStore();

  useEffect(() => {
    if (documentShow && categoryShow && repo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${repo.id}&categoryId=${categoryShow?.id}&documentId=${documentShow.id}`,
      );
    } else if (categoryShow && repo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${repo.id}&categoryId=${categoryShow?.id}`,
      );
    } else if (documentShow && repo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${repo.id}&documentId=${documentShow.id}`,
      );
    } else if (repo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${repo.id}`,
      );
    }
    if (window.location.pathname === "/admin/dashboard") {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}`,
      );
    }
  }, [documentShow, categoryShow, repo]);

  return null;
};

export default PanelUrl;
