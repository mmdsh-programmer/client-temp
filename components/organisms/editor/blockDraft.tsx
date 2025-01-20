import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editorDataAtom, editorModeAtom } from "atom/editor";
import { selectedDocumentAtom } from "atom/document";
import { toast } from "react-toastify";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import { IVersion } from "@interface/version.interface";
import { repoAtom } from "@atom/repository";
import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  children: JSX.Element;
  version: IVersion;
}
const BlockDraft = React.memo(({ children, version }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const getRepoId = searchParams.get("repoId");
  const sharedDocuments = searchParams.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createBlockHook = useCreateBlock();

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return selectedDocument!.repoId;
    }
    if (sharedDocuments === "true") {
      return +getRepoId!;
    }
    return getRepo!.id;
  };

  useEffect(() => {
    if (repoId() && selectedDocument && version && editorMode === "edit") {
      createBlockHook.mutate({
        repoId: repoId(),
        documentId: selectedDocument.id,
        versionId: version.id,
        isDirectAccess:
        sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
        handleError: () => {
          setEditorData(null);
        },
      });
    } else if (!version || JSON.stringify(version) === "{}") {
      setEditorData(null);
      toast.error("نسخه ای برای این سند پیدا نشد!");
    }
  }, [repoId(), selectedDocument, version, editorMode]);

  return (
    <div className="version-list__container h-full w-full max-w-full relative modal-box flex flex-col cursor-default p-0">
      {children}
    </div>
  );
});

export default BlockDraft;
