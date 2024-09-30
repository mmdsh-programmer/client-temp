import {
  selectedVersionAtom,
  versionDrawerAtom,
  versionModalListAtom,
} from "@atom/version";
import {
 useRecoilValue,
 useSetRecoilState
} from "recoil";

import { DialogBody } from "@material-tailwind/react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import React from "react";
import VersionList from "../version/versionList";
import VersionMenu from "@components/molecules/versionMenu";
import { selectedDocumentAtom } from "@atom/document";

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
        <VersionMenu version={getSelectedVersion} showDrawer />
      ) : null}
    </InfoDialog>
  );
};

export default VersionDialogView;
