import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { versionModalListAtom } from "@atom/version";

const VersionDialogView = () => {
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);

  return (
    <>
      <InfoDialog
        dialogHeader={getSelectedDocument?.name}
        setOpen={() => {
          setVersionModalList(false);
        }}
        className="!min-w-[95%] !min-h-[95%]"
      >
        <DialogBody placeholder="dialog body" className="p-0 xs:p-6 h-full">
          <VersionList />
        </DialogBody>
      </InfoDialog>
    </>
  );
};

export default VersionDialogView;
