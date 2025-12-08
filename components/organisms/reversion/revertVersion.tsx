import React from "react";
import { Button } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import useRevertVersion from "@hooks/version/reversion/useRevertVersion";
import { RevertIcon } from "@components/atoms/icons";
import { Spinner } from "@components/atoms/spinner";
import { toast } from "react-toastify";
import { useEditorStore } from "@store/editor";
import useRepoId from "@hooks/custom/useRepoId";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";

interface IProps {
  versionIndex: number;
}

const RevertVersion = ({ versionIndex }: IProps) => {
  const repoId = useRepoId();
  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();
  const { selectedVersion } = useVersionStore();
  const { editorMode } = useEditorStore();

  const currentPath = usePathname();
  const { data: userInfo } = useGetUser();
  const revertVersion = useRevertVersion();

  const isWriterOrViewer = () => {
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== selectedDocument?.repoId)
    )
      return ["viewer", "writer"].includes(selectedDocument?.accesses?.[0] ?? "");

    return getRepo?.roleName === ERoles.viewer || getRepo?.roleName === ERoles.writer;
  };

  const handleRevert = () => {
    if (!repoId) {
      toast.error("اطلاعات مخزن وجود ندارد.");
      return;
    }
    revertVersion.mutate({
      repoId,
      documentId: selectedDocument!.id,
      versionId: selectedVersion!.id,
      versionIndex,
      transaction: false,
      innerDocument: editorMode === "preview",
      innerOutline: editorMode === "preview",
      callBack: () => {
        toast.success(`نسخه با موفقیت به نسخه شماره ${versionIndex} بازگردانده شد.`);
      },
    });
  };

  const renderContent = () => {
    if (revertVersion.isPending) {
      return <Spinner className="h-4 w-4" />;
    }
    return (
      <Button
        className="bg-transparent p-0"
        {...({} as React.ComponentProps<typeof Button>)}
        onClick={(e) => {
          e.stopPropagation();
          handleRevert();
        }}
      >
        <RevertIcon className="h-4 w-4 fill-icon-hover" />
      </Button>
    );
  };

  return isWriterOrViewer() &&
    selectedVersion?.creator?.userName.toLowerCase() !== userInfo?.username.toLowerCase()
    ? null
    : renderContent();
};

export default RevertVersion;
