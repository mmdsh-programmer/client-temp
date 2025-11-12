import React, { useState } from "react";
import { useDocumentStore } from "@store/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import VersionList from "../version/versionList";
import { useVersionStore } from "@store/version";
import { usePathname } from "next/navigation";
import { useCategoryStore } from "@store/category";
import DrawerTemplate from "@components/templates/drawerTemplate";
import VersionDialogs from "@components/molecules/versionDialogs";
import useVersionMenu from "@components/molecules/versionMenu/useVersionMenu";

const VersionDialogView = () => {
  const currentPath = usePathname();

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setCategorySearchContentLink: setLink } = useCategoryStore();
  const { selectedDocument, setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { selectedVersion, setVersionModalList, versionDrawer, setVersionDrawer } =
    useVersionStore();

  const menuList = useVersionMenu(selectedVersion, undefined, setActiveModal);
  const closeModal = () => {
    return setActiveModal(null);
  };

  const drawerMenuList = menuList.map((item) => {
    return {
      ...item,
      onClick: () => {
        item.onClick();
        setVersionDrawer(false);
      },
    };
  });

  return (
    <InfoDialog
      dialogHeader={selectedDocument?.name}
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
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="dialog-body h-full p-0 xs:p-6">
        <VersionList />
      </DialogBody>
      <div className="flex xs:hidden">
        <DrawerTemplate
          openDrawer={versionDrawer}
          setOpenDrawer={setVersionDrawer}
          menuList={drawerMenuList}
        />
        <VersionDialogs activeModal={activeModal} closeModal={closeModal} />
      </div>
    </InfoDialog>
  );
};

export default VersionDialogView;
