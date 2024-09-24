import React from "react";
import VersionList from "@components/organisms/version/versionList";
import { useRecoilState } from "recoil";
import { editorModalAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";

const VersionPage = () => {
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);
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
