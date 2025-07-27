"use client";

import React, { useEffect } from "react";
import CategoryList from "@components/organisms/category";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { bulkItemsAtom } from "@atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import { editorModalAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";
import { versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { repoAtom } from "@atom/repository";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";

const MyDocumentsPage = () => {
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);

  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetBulkItems = useResetRecoilState(bulkItemsAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetBulkItems();
  }, []);

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
      <div className="relative">{getBulkItems.length ? <CategoryBulk /> : null}</div>
    </div>
  );
};

export default MyDocumentsPage;
