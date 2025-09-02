"use client";

import React, { useEffect } from "react";
import SharedDocumentList from "@components/organisms/sharedDocumentList";
import CategoryBulk from "@components/molecules/categoryBulk";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Editor from "@components/organisms/dialogs/editor";
import { useVersionStore } from "@store/version";
import { useBulkStore } from "@store/bulk";
import { useEditorStore } from "@store/editor";
import { useRepositoryStore } from "@store/repository";
import { useSearchParams } from "next/navigation";

const SharedDocuments = () => {
  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");

  const { setRepositoryId } = useRepositoryStore();
  const { versionModalList: getShowVersionList } = useVersionStore();
  const { bulkItems: getBulkItems } = useBulkStore();
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();

  useEffect(() => {
    if (repoId) {
      setRepositoryId(+repoId);
    }
  }, [repoId]);

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <SharedDocumentList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      <div className="relative">{getBulkItems.length ? <CategoryBulk /> : null}</div>
    </div>
  );
};

export default SharedDocuments;
