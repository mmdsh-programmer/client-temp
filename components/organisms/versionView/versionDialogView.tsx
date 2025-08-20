import React from "react";
import { useDocumentStore } from "@store/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { useVersionStore } from "@store/version";
import VersionMenu from "@components/molecules/versionMenu";
import { usePathname } from "next/navigation";
import { useCategoryStore } from "@store/category";

const VersionDialogView = () => {
  const getSelectedDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const setSelectedDocument = useDocumentStore((s) => {
    return s.setSelectedDocument;
  });
  const setDocumentShow = useDocumentStore((s) => {
    return s.setDocumentShow;
  });
  const setVersionModalList = useVersionStore((s) => {
    return s.setVersionModalList;
  });
  const setLink = useCategoryStore((s) => {
    return s.setCategorySearchContentLink;
  });

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
