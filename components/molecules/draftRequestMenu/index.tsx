import React from "react";
import { IVersion } from "@interface/version.interface";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";
import { useReleaseDocsStore } from "@store/releaseDocs";

interface IProps {
  request?: IVersion;
  showDrawer?: boolean;
}

const DraftRequestMenu = ({ showDrawer, request }: IProps) => {
  const {
    setAcceptVersion: setAcceptRequestModal,
    setRejectVersion: setRejectRequestModal,
    versionRequestDrawer: openRequestActionDrawer,
    setVersionRequestDrawer: setOpenRequestActionDrawer,
    setSelectedRequest: setRequest,
  } = useReleaseDocsStore();

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
    <div className="repo-draft-request-menu flex xs:hidden">
      <DrawerTemplate
        openDrawer={openRequestActionDrawer}
        setOpenDrawer={() => {
          return setOpenRequestActionDrawer(false);
        }}
        menuList={menuList}
      />
    </div>
  ) : (
    <MenuTemplate
      onMobileClick={() => {
        setRequest(request);
        setOpenRequestActionDrawer(true);
      }}
      menuList={menuList}
      icon={
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
          <MoreDotIcon className="h-4 w-4" />
        </div>
      }
      className="repo-draft-request-menu"
    />
  );
};

export default DraftRequestMenu;
