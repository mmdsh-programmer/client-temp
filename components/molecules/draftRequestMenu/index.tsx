import React from "react";
import { IVersion } from "@interface/version.interface";
import {
  acceptVersionAtom,
  rejectVersionAtom,
  selectedRequestAtom,
  versionRequestDrawerAtom,
} from "@atom/releaseDocs";
import { useRecoilState, useSetRecoilState } from "recoil";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";

interface IProps {
  request?: IVersion;
  showDrawer?: boolean;
}

const DraftRequestMenu = ({ showDrawer, request }: IProps) => {
  const setAcceptRequestModal = useSetRecoilState(acceptVersionAtom);
  const setRejectRequestModal = useSetRecoilState(rejectVersionAtom);
  const [openRequestActionDrawer, setOpenRequestActionDrawer] = useRecoilState(
    versionRequestDrawerAtom
  );
  const setRequest = useSetRecoilState(selectedRequestAtom);

  const menuList = [
    {
      text: "قبول درخواست",
      onClick: () => {
        setAcceptRequestModal(true);
        setOpenRequestActionDrawer(false);
        if (request) {
          setRequest(request);
        }
      },
      className: "repo-draft-request__accept-request",
    },
    {
      text: "رد درخواست",
      onClick: () => {
        setRejectRequestModal(true);
        setOpenRequestActionDrawer(false);
        if (request) {
          setRequest(request);
        }
      },
      className: "repo-draft-request__reject-request",
    },
  ];

  return showDrawer ? (
    <div className="repo-draft-request-menu xs:hidden flex">
      <DrawerTemplate
        openDrawer={openRequestActionDrawer}
        setOpenDrawer={setOpenRequestActionDrawer}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      setOpenDrawer={() => {
        setRequest(request);
        setOpenRequestActionDrawer(true);
      }}
      menuList={menuList}
      icon={
        <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
          <MoreDotIcon className="w-4 h-4" />
        </div>
      }
      className="repo-draft-request-menu"
    />
  );
};

export default DraftRequestMenu;
