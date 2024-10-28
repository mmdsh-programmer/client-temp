import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { versionModalListAtom } from "@atom/version";

const VersionDialogView = () => {
  const [getSelectedDocument, setSelectedDocument] = useRecoilState(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);

  return (
    <InfoDialog
      dialogHeader={getSelectedDocument?.name}
      setOpen={() => {
        setVersionModalList(false);
        setDocumentShow(null);
        setSelectedDocument(null);
      }}
      className="!min-w-[95%] !min-h-[95%]"
    >
      <DialogBody placeholder="dialog body" className="p-0 xs:p-6 h-full">
        <VersionList />
      </DialogBody>
    </InfoDialog>
  );
};

export default VersionDialogView;
