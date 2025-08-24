import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { IVersion } from "@interface/version.interface";
import { useEditorStore } from "@store/editor";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import useCreateBlock from "@hooks/editor/useCreateBlock";
import { useDebouncedCallback } from "use-debounce";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  children: JSX.Element;
  version: IVersion;
}

const BlockDraft = React.memo(({ children, version }: IProps) => {
  const repoId = useRepoId();
  const { selectedDocument } = useDocumentStore();
  const { setEditorData, editorMode, setEditorMode } = useEditorStore();
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createBlockHook = useCreateBlock();

  const handleBlock = useDebouncedCallback(() => {
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
        handleError: () => {
          setEditorMode("preview");
        },
      });
    }
  }, 1000);

  useEffect(() => {
    if (repoId && selectedDocument && version && editorMode === "edit") {
      handleBlock();
    } else if (!version || JSON.stringify(version) === "{}") {
      setEditorData(null);
      toast.error("نسخه ای برای این سند پیدا نشد!");
    }
  }, [repoId, selectedDocument, version, editorMode]);

  return (
    <div className="block-draft modal-box relative flex h-full w-full max-w-full cursor-default flex-col p-0">
      {children}
    </div>
  );
});

export default BlockDraft;
