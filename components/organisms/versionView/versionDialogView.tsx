import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import {
  selectedVersionAtom,
  versionDrawerAtom,
  versionModalListAtom,
} from "@atom/version";
import VersionMenu from "@components/molecules/versionMenu";

const VersionDialogView = () => {
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const openVersionActionDrawer = useRecoilValue(versionDrawerAtom);
  const getSelectedVersion = useRecoilValue(selectedVersionAtom);

  return (
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
      {openVersionActionDrawer && getSelectedVersion ? (
        <VersionMenu version={getSelectedVersion} showDrawer={true} />
      ) : null}
    </InfoDialog>
  );
};

export default VersionDialogView;
