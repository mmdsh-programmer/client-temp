import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useCategoryStore } from "@store/category";

const useRepoId = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const { repo: getRepo } = useRepositoryStore();
  const { category } = useCategoryStore();
  const { selectedDocument: getSelectedDocument } = useDocumentStore();

  const { data: userInfo } = useGetUser();

  const getRepoId = searchParams?.get("repoId");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" &&
        (getSelectedDocument?.repoId === userInfo?.repository.id ||
          category?.repoId === userInfo?.repository.id))
    ) {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments" && getSelectedDocument) {
      return getSelectedDocument!.repoId;
    }
    if (
      currentPath === "/admin/dashboard" &&
      getSelectedDocument?.repoId !== userInfo?.repository.id
    ) {
      return getSelectedDocument!.repoId;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    if (getRepo) {
      return getRepo!.id;
    }
    return null;
  };

  return repoId();
};

export default useRepoId;
