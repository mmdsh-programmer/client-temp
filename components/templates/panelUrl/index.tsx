"use client";

import { useEffect } from "react";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import useGetUser from "@hooks/auth/useGetUser";

const PanelUrl = () => {
  const { repo, repositoryId } = useRepositoryStore();
  const { categoryShow } = useCategoryStore();
  const { documentShow } = useDocumentStore();

  const { data: userInfo } = useGetUser();

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
    } else if (
      documentShow &&
      categoryShow &&
      userInfo?.repository.id === documentShow.repoId &&
      repositoryId &&
      !repo
    ) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${documentShow.repoId}&categoryId=${categoryShow?.id}&documentId=${documentShow.id}`,
      );
    } else if (
      categoryShow &&
      userInfo?.repository.id === categoryShow.repoId &&
      repositoryId &&
      !repo
    ) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${categoryShow.repoId}&categoryId=${categoryShow?.id}`,
      );
    } else if (documentShow && repositoryId && !repo) {
      window.history.replaceState(
        null,
        "",
        `${window.location.origin}${window.location.pathname}?repoId=${documentShow.repoId}&documentId=${documentShow.id}`,
      );
    }
    if (window.location.pathname === "/admin/dashboard" && !repositoryId) {
      window.history.replaceState(null, "", `${window.location.origin}${window.location.pathname}`);
    }
  }, [documentShow, categoryShow, repo, repositoryId]);

  return null;
};

export default PanelUrl;
