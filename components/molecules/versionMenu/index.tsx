import React, { useState } from "react";
import { MoreDotIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import useVersionMenu from "./useVersionMenu";
import VersionDialogs from "../versionDialogs";
import MenuTemplate from "@components/templates/menuTemplate";
import { useVersionStore } from "@store/version";

interface IProps {
  version: IVersion;
  lastVersion?: IVersion;
}

const VersionMenu = ({ version, lastVersion }: IProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setSelectedVersion, setVersionDrawer } = useVersionStore();

  const menuList = useVersionMenu(version, lastVersion, setActiveModal);

  const closeModal = () => {
    return setActiveModal(null);
  };

  if (menuList.length === 0) {
    return null;
  }

  return (
    <>
      <div
        onClick={(e) => {
          return e.stopPropagation();
        }}
        className="version-menu"
      >
        <MenuTemplate
          menuList={menuList}
          onMobileClick={() => {
            setVersionDrawer(true);
            setSelectedVersion(version);
          }}
          icon={
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
              <MoreDotIcon className="h-4 w-4" />
            </div>
          }
        />
      </div>
      <VersionDialogs activeModal={activeModal} closeModal={closeModal} />
    </>
  );
};

export default VersionMenu;
