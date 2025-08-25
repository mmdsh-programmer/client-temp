import React, { useState } from "react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { IVersion } from "@interface/version.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";
import VersionDialogs from "../versionDialogs";
import useVersionMenuList from "./useVersionMenu";
import { useVersionStore } from "@store/version";

interface IProps {
  version?: IVersion;
  lastVersion?: IVersion;
  showDrawer?: boolean;
}

const VersionMenu = ({ lastVersion, version, showDrawer }: IProps) => {
  const {
    selectedVersion: getVersion,
    setSelectedVersion: setVersion,
    versionDrawer: openVersionActionDrawer,
    setVersionDrawer: setOpenVersionActionDrawer,
  } = useVersionStore();

  const [modals, setModals] = useState({
    compare: false,
    delete: false,
    edit: false,
    clone: false,
    confirm: false,
    cancelConfirm: false,
    public: false,
    cancelPublic: false,
    lastVersion: false,
    publicDraft: false,
    acceptConfirmDraft: false,
    acceptPublicVersion: false,
    acceptPublicDraft: false,
    rejectPublicDraft: false,
  });

  const setModalState = (key: keyof typeof modals, state: boolean) => {
    setModals((prev) => {
      return { ...prev, [key]: state };
    });
  };

  const menuList = useVersionMenuList(version || getVersion, lastVersion, setModalState);

  return (
    <>
      {showDrawer ? (
        <div className="version-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={openVersionActionDrawer}
            setOpenDrawer={() => {
              return setOpenVersionActionDrawer(false);
            }}
            menuList={menuList}
          />
        </div>
      ) : (
        <MenuTemplate
          setOpenDrawer={() => {
            setOpenVersionActionDrawer(true);
            setVersion(version || null);
          }}
          menuList={menuList}
          icon={
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
              <MoreDotIcon className="h-4 w-4" />
            </div>
          }
          className="version-menu"
        />
      )}
      <VersionDialogs modals={modals} setModalState={setModalState} />
    </>
  );
};

export default VersionMenu;
