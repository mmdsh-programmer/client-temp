import React from "react";
import { IVersion } from "@interface/version.interface";
import {
  acceptDraftAtom,
  rejectDraftAtom,
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
  const setAcceptRequestModal = useSetRecoilState(acceptDraftAtom);
  const setRejectRequestModal = useSetRecoilState(rejectDraftAtom);
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
    },
  ];

  return showDrawer ? (
    <div className="xs:hidden flex">
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
    />
  );
};

export default DraftRequestMenu;
