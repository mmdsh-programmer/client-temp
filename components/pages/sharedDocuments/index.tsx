"use client";

import React from "react";
import SharedDocumentList from "@components/organisms/sharedDocumentList";
import Editor from "@components/organisms/dialogs/editor";
import { useRecoilState, useRecoilValue } from "recoil";
import { versionModalListAtom } from "@atom/version";
import { editorModalAtom } from "@atom/editor";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";

const SharedDocumentsPage = () => {
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);

  return (
    <>
      <SharedDocumentList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      <RepoTypesMobileView />
    </>
  );
};

export default SharedDocumentsPage;
