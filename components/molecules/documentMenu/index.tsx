import React, { useState } from "react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { IDocumentMetadata } from "@interface/document.interface";
import { InvisibleIcon, MoreDotIcon, StarIcon } from "@components/atoms/icons";
import DocumentDialogs from "../documentDialogs";
import useDocumentMenuList from "./useDocumentMenuList";
import { usePathname } from "next/navigation";
import { useDocumentDrawerStore, useDocumentStore } from "@store/document";

interface IProps {
  document?: IDocumentMetadata;
  showDrawer?: boolean;
}

const DocumentMenu = ({ document, showDrawer }: IProps) => {
  const currentPath = usePathname();
  const setDocument = useDocumentStore((state) => {
    return state.setSelectedDocument;
  });
  const [openDocumentActionDrawer, setOpenDocumentActionDrawer] = [
    useDocumentDrawerStore((state) => {
      return state.documentDrawer;
    }),
    useDocumentDrawerStore((state) => {
      return state.setDocumentDrawer;
    }),
  ];

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
    documentVersionList: false,
    documentDirectAccess: false,
    createPublishLink: false,
    deletePublishLink: false,
    documentPublicVersion: false,
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
        <div className="document-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={openDocumentActionDrawer}
            setOpenDrawer={(open) => {
              setOpenDocumentActionDrawer(!!open);
            }}
            menuList={menuList}
          />
        </div>
      ) : (
        <div className="document-menu flex items-center justify-end gap-1">
          {document?.isHidden ? <InvisibleIcon className="h-4 w-4 flex-none" /> : null}
          {currentPath !== "/admin/sharedDocuments" && document?.isBookmarked ? (
            <StarIcon className="h-4 w-4 fill-amber-600 stroke-amber-600" />
          ) : null}
          <MenuTemplate
            setOpenDrawer={() => {
              setDocument(document || null);
              setOpenDocumentActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                <MoreDotIcon className="h-4 w-4" />
              </div>
            }
            className="document-menu"
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
