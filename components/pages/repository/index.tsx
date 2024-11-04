"use client";

import React from "react";
import CategoryBulk from "@components/molecules/categoryBulk";
import CategoryList from "@components/organisms/category";
import RepoInfo from "@components/organisms/repoInfo";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import { bulkItemsAtom } from "@atom/bulk";
import { useRecoilState, useRecoilValue } from "recoil";
import { versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { editorModalAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";

const RepoPage = () => {
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
      {getBulkItems.length ? <CategoryBulk /> : <RepoTypesMobileView />}
    </div>
  );
};

export default RepoPage;
