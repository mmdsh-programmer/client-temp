import React from "react";
import VersionList from "@components/organisms/version/versionList";
import Editor from "@components/organisms/dialogs/editor";
import { useEditorStore } from "@store/editor";

const VersionPage = () => {
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();
  return (
    <>
      <VersionList />
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default VersionPage;
