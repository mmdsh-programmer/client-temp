import React, { useState } from "react";
import { selectedVersionAtom, versionDrawerAtom } from "@atom/version";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { IVersion } from "@interface/version.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";
import VersionDialogs from "../versionDialogs";
import { useRecoilState } from "recoil";
import useVersionMenuList from "./useVersionMenu";

interface IProps {
  version?: IVersion;
  lastVersion?: IVersion;
  showDrawer?: boolean;
}

const VersionMenu = ({ lastVersion, version, showDrawer }: IProps) => {
  const [getVersion, setVersion] = useRecoilState(selectedVersionAtom);
  const [openVersionActionDrawer, setOpenVersionActionDrawer] =
    useRecoilState(versionDrawerAtom);

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
        <div className="version-menu xs:hidden flex">
          <DrawerTemplate
            openDrawer={openVersionActionDrawer}
            setOpenDrawer={setOpenVersionActionDrawer}
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
            <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
              <MoreDotIcon className="w-4 h-4" />
            </div>
          }
          className="version-menu"
        />
      )}
      <VersionDialogs
        modals={modals}
        setModalState={setModalState}
      />
    </>
  );
};

export default VersionMenu;
