import React, { useState } from "react";
import { IVersion } from "@interface/version.interface";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedVersionAtom, versionDrawerAtom } from "@atom/version";
import useVersionMenuList from "./useVersionMenu";
import { MoreDotIcon } from "@components/atoms/icons";
import VersionDialogs from "../versionDialogs";

interface IProps {
  version?: IVersion;
  lastVersion?: IVersion;
  showDrawer?: boolean;
}

const VersionMenu = ({ lastVersion, version, showDrawer }: IProps) => {
  const setVersion = useSetRecoilState(selectedVersionAtom);
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
  });

  const setModalState = (key: keyof typeof modals, state: boolean) => {
    setModals((prev) => {
      return { ...prev, [key]: state };
    });
  };

  const menuList = useVersionMenuList(version, lastVersion, setModalState);

  return (
    <>
      {showDrawer ? (
        <div className="xs:hidden flex">
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
        />
      )}
      <VersionDialogs
        modals={modals}
        setModalState={setModalState}
        version={version}
      />
    </>
  );
};

export default VersionMenu;
