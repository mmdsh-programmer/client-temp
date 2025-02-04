import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetUser from "@hooks/auth/useGetUser";

const useRepoId = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const { data: userInfo } = useGetUser();

  const getRepoId = searchParams?.get("repoId");
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments" && getSelectedDocument) {
      return getSelectedDocument!.repoId;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return undefined;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    return getRepo!.id;
  };

  return repoId();
};

export default useRepoId;
