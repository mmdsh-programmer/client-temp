import React from "react";
import { Button } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import useRevertVersion from "@hooks/version/reversion/useRevertVersion";
import { RevertIcon } from "@components/atoms/icons";
import { Spinner } from "@components/atoms/spinner";
import { toast } from "react-toastify";
import { useEditorStore } from "@store/editor";

interface IProps {
  versionIndex: number;
}

const RevertVersion = ({ versionIndex }: IProps) => {
  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();
  const { selectedVersion } = useVersionStore();
  const { editorMode } = useEditorStore();

  const revertVersion = useRevertVersion();

  const handleRevert = () => {
    revertVersion.mutate({
      repoId: repo!.id,
      documentId: selectedDocument!.id,
      versionId: selectedVersion!.id,
      versionIndex,
      transaction: true,
      innerDocument: editorMode === "preview",
      innerOutline: editorMode === "preview",
      callBack: () => {
        toast.success(`نسخه با موفقیت به نسخه شماره ${versionIndex} بازگردانده شد.`);
      },
    });
  };

  return revertVersion.isPending ? (
    <Spinner className="h-4 w-4" />
  ) : (
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

export default RevertVersion;
