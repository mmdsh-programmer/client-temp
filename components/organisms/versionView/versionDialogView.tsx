import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { versionModalListAtom } from "@atom/version";
import VersionMenu from "@components/molecules/versionMenu";
import { usePathname } from "next/navigation";
import { searchContentLinkAtom } from "@atom/category";

const VersionDialogView = () => {
  const [getSelectedDocument, setSelectedDocument] = useRecoilState(selectedDocumentAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);
  const setLink = useSetRecoilState(searchContentLinkAtom);

  const currentPath = usePathname();

  return (
    <InfoDialog
      dialogHeader={getSelectedDocument?.name}
      setOpen={() => {
        setVersionModalList(false);
        setLink(null);
        if (!currentPath.includes("/admin/edit")) {
          setDocumentShow(null);
          setSelectedDocument(null);
        }
      }}
      className="version-list__container !h-full !min-h-[95%] !min-w-[95%] xs:!h-[95%]"
    >
      <DialogBody placeholder="dialog body" className="dialog-body h-full p-0 xs:p-6">
        <VersionList />
      </DialogBody>
      <div className="flex xs:hidden">
        <VersionMenu showDrawer />
      </div>
    </InfoDialog>
  );
};

export default VersionDialogView;
