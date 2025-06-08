import React, { useEffect } from "react";
import { editorDataAtom, editorModeAtom } from "atom/editor";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IVersion } from "@interface/version.interface";
import { selectedDocumentAtom } from "atom/document";
import { toast } from "react-toastify";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  children: JSX.Element;
  version: IVersion;
}

const BlockDraft = React.memo(({ children, version }: IProps) => {
  const repoId = useRepoId();
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const setEditorData = useSetRecoilState(editorDataAtom);
  const [editorMode, setEditorMode] = useRecoilState(editorModeAtom);
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createBlockHook = useCreateBlock();

  useEffect(() => {
    if (repoId && selectedDocument && version && editorMode === "edit") {
      createBlockHook.mutate({
        repoId,
        documentId: selectedDocument.id,
        versionId: version.id,
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" &&
            userInfo?.repository.id !== selectedDocument?.repoId),
        handleError: (error) => {
          console.log("--------------------- error ----------------", error);
          setEditorMode("preview");
        },
      });
    } else if (!version || JSON.stringify(version) === "{}") {
      setEditorData(null);
      toast.error("نسخه ای برای این سند پیدا نشد!");
    }
  }, [repoId, selectedDocument, version, editorMode]);

  return (
    <div className=" modal-box relative flex h-full w-full max-w-full cursor-default flex-col p-0">
      {children}
    </div>
  );
});

export default BlockDraft;
