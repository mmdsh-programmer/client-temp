"use client";

import React from "react";
import SharedDocumentList from "@components/organisms/sharedDocumentList";
import { bulkItemsAtom } from "atom/bulk";
import CategoryBulk from "@components/molecules/categoryBulk";
import { useRecoilState, useRecoilValue } from "recoil";
import { versionModalListAtom } from "@atom/version";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Editor from "@components/organisms/dialogs/editor";
import { editorModalAtom } from "@atom/editor";

const SharedDocuments = () => {
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const getBulkItems = useRecoilValue(bulkItemsAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);

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
      <div className="relative">
        {getBulkItems.length ? <CategoryBulk /> : null}
      </div>
    </div>
  );
};

export default SharedDocuments;
