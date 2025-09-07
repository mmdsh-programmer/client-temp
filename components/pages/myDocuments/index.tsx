"use client";

import React, { useEffect } from "react";
import CategoryList from "@components/organisms/category";
import CategoryBulk from "@components/molecules/categoryBulk";
import Editor from "@components/organisms/dialogs/editor";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { useVersionStore } from "@store/version";
import { useBulkStore } from "@store/bulk";
import { useEditorStore } from "@store/editor";
import { useSearchParams } from "next/navigation";
import { useRepositoryStore } from "@store/repository";

const MyDocumentsPage = () => {
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
      <CategoryList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      {getBulkItems.length ? <CategoryBulk /> : null}{" "}
    </div>
  );
};

export default MyDocumentsPage;
