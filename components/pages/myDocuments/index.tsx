"use client";

import React, { useEffect } from "react";
import CategoryList from "@components/organisms/category";
import CategoryBulk from "@components/molecules/categoryBulk";
import Editor from "@components/organisms/dialogs/editor";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import { useVersionStore } from "@store/version";
import { useBulkStore } from "@store/bulk";
import { useEditorStore } from "@store/editor";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

const MyDocumentsPage = () => {
  const getShowVersionList = useVersionStore((state) => {
    return state.versionModalList;
  });
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();
  const { setRepo } = useRepositoryStore();
  const { setCategory, setCategoryShow } = useCategoryStore();
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setBulkItems } = useBulkStore();

  useEffect(() => {
    setRepo(null);
    setCategory(null);
    setCategoryShow(null);
    setSelectedDocument(null);
    setDocumentShow(null);
    setBulkItems([]);
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
