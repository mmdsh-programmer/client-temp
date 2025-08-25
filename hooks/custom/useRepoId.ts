import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";

const useRepoId = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getSelectedDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const { data: userInfo } = useGetUser();

  const getRepoId = searchParams?.get("repoId");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" &&
        getSelectedDocument?.repoId === userInfo?.repository.id)
    ) {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments" && getSelectedDocument) {
      return getSelectedDocument!.repoId;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    if (
      currentPath === "/admin/dashboard" &&
      getSelectedDocument?.repoId !== userInfo?.repository.id
    ) {
      return getSelectedDocument!.repoId;
    }
    if (getRepo) {
      return getRepo!.id;
    }
    return null;
  };

  return repoId();
};

export default useRepoId;
