"use client";

import React from "react";
import { bulkItemsAtom } from "atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import { useRecoilState, useRecoilValue } from "recoil";
import RepoInfo from "@components/organisms/repoInfo";
import CategoryList from "@components/organisms/category";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { versionModalListAtom } from "@atom/version";
import { editorModalAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";

const Repository = () => {
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);

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
