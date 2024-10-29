import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { versionDrawerAtom, versionModalListAtom } from "@atom/version";
import VersionMenu from "@components/molecules/versionMenu";

const VersionDialogView = () => {
  const [getSelectedDocument, setSelectedDocument] =
    useRecoilState(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);
  const openVersionActionDrawer = useRecoilValue(versionDrawerAtom);

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
      {openVersionActionDrawer ? <VersionMenu showDrawer /> : null}
    </InfoDialog>
  );
};

export default VersionDialogView;
