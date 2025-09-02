import React, { useCallback, useState } from "react";
import MenuTemplate from "@components/templates/menuTemplate";
import { IDocumentMetadata } from "@interface/document.interface";
import { InvisibleIcon, MoreDotIcon, StarIcon } from "@components/atoms/icons";
import DocumentDialogs from "../documentDialogs";
import useDocumentMenuList from "./useDocumentMenuList";
import { usePathname } from "next/navigation";
import { useDocumentDrawerStore, useDocumentStore } from "@store/document";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentMenu = ({ document }: IProps) => {
  const currentPath = usePathname();

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setDocumentDrawer } = useDocumentDrawerStore();
  const { setSelectedDocument } = useDocumentStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      setSelectedDocument(document);
      setActiveModal(modalName);
    },
    [document, setSelectedDocument],
  );

  const menuList = useDocumentMenuList(document, handleSetModal);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedDocument(null);
  };

  if (menuList.length === 0) {
    return null;
  }

  return (
    <>
      <div className="document-menu flex items-center justify-end gap-1">
        {document?.isHidden ? <InvisibleIcon className="h-4 w-4 flex-none" /> : null}
        {currentPath !== "/admin/sharedDocuments" && document?.isBookmarked ? (
          <StarIcon className="h-4 w-4 fill-amber-600 stroke-amber-600" />
        ) : null}
        <MenuTemplate
          menuList={menuList}
          onMobileClick={() => {
            setSelectedDocument(document || null);
            setDocumentDrawer(true);
          }}
          icon={
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
              <MoreDotIcon className="h-4 w-4" />
            </div>
          }
        />
      </div>
      <DocumentDialogs activeModal={activeModal} closeModal={closeModal} />
    </>
  );
};

export default DocumentMenu;
