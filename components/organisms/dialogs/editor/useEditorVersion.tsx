import useGetVersion from "@hooks/version/useGetVersion";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { IVersion } from "@interface/version.interface";
import { IDocumentMetadata } from "@interface/document.interface";

export const useEditorVersion = ({
  repoId,
  document,
  selectedVersion,
  editorMode,
}: {
  repoId?: number | null;
  document: IDocumentMetadata | null;
  selectedVersion: IVersion | null;
  editorMode: string;
}) => {
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const isDirectAccess =
    currentPath === "/admin/sharedDocuments" ||
    (currentPath === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId);

  const shouldFetchLastVersion = !!repoId && !!document?.id && !selectedVersion;

  const { data: lastVersion, error: lastVersionError } = useGetLastVersion(
    repoId!,
    document!.id,
    isDirectAccess,
    shouldFetchLastVersion,
  );

  const versionId = selectedVersion ? selectedVersion.id : lastVersion?.id;
  const versionState = selectedVersion ? selectedVersion.state : lastVersion?.state;

  const shouldFetchVersion = !!repoId && !!document?.id && !!versionId && !!versionState;

  const { data, error, isLoading, isSuccess, refetch } = useGetVersion(
    repoId!,
    document!.id,
    versionId,
    versionState,
    editorMode === "preview",
    editorMode === "preview",
    isDirectAccess,
    shouldFetchVersion,
  );

  const errorCombined = lastVersionError || error;

  return {
    version: data,
    lastVersion,
    isLoading,
    isSuccess,
    refetch,
    error: errorCombined,
  };
};
