import React, { useState } from "react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { IDocumentMetadata } from "@interface/document.interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import { documentDrawerAtom, selectedDocumentAtom } from "@atom/document";
import { MoreDotIcon, StarIcon } from "@components/atoms/icons";
import DocumentDialogs from "../documentDialogs";
import useDocumentMenuList from "./useDocumentMenuList";

interface IProps {
  document?: IDocumentMetadata;
  showDrawer?: boolean;
}

const DocumentMenu = ({ document, showDrawer }: IProps) => {
  const setDocument = useSetRecoilState(selectedDocumentAtom);

  const [openDocumentActionDrawer, setOpenDocumentActionDrawer] =
    useRecoilState(documentDrawerAtom);

  const [modals, setModals] = useState({
    editDocument: false,
    deleteDocument: false,
    move: false,
    hide: false,
    visible: false,
    editContent: false,
    documentTags: false,
    documentAccess: false,
    bookmarkDocument: false,
    createPassword: false,
    updatePassword: false,
    deletePassword: false,
    documentAccessPublishing: false,
  });

  const toggleModal = (modalName: keyof typeof modals, value: boolean) => {
    setModals((prev) => {
      return { ...prev, [modalName]: value };
    });
  };

  const menuList = useDocumentMenuList({ document, toggleModal });

  return (
    <>
      {showDrawer ? (
        <div className="xs:hidden flex">
          <DrawerTemplate
            openDrawer={openDocumentActionDrawer}
            setOpenDrawer={setOpenDocumentActionDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <div className="flex items-center justify-end gap-1">
          {document?.isBookmarked ? (
            <StarIcon className="w-4 h-4  fill-amber-600 stroke-amber-600" />
          ) : null}
          <MenuTemplate
            setOpenDrawer={() => {
              setDocument(document || null);
              setOpenDocumentActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                <MoreDotIcon className="w-4 h-4" />
              </div>
            }
          />
        </div>
      )}
      <DocumentDialogs
        modalsState={modals}
        toggleModal={(modalName, value) => {
          toggleModal(modalName as keyof typeof modals, value);
          setDocument(null);
        }}
      />
    </>
  );
};

export default DocumentMenu;
