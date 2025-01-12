"use client";

import React from "react";
import CategoryList from "@components/organisms/category";
import { useRecoilState, useRecoilValue } from "recoil";
import { bulkItemsAtom } from "@atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import { editorModalAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";
import { versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";

const MyDocumentsPage = () => {
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);

  return (
    <>
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
    </>
  );
};

export default MyDocumentsPage;
