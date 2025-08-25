"use client";

import React from "react";
import CategoryBulk from "@components/molecules/categoryBulk";
import RepoInfo from "@components/organisms/repoInfo";
import CategoryList from "@components/organisms/category";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Editor from "@components/organisms/dialogs/editor";
import { useVersionStore } from "@store/version";
import { useBulkStore } from "@store/bulk";
import { useEditorStore } from "@store/editor";

const Repository = () => {
  const getShowVersionList = useVersionStore((state) => {
    return state.versionModalList;
  });
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <RepoInfo />
      <CategoryList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      {getBulkItems.length ? <CategoryBulk /> : null}
    </div>
  );
};

export default Repository;
