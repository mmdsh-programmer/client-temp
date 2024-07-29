import React, { useState } from "react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { IDocumentMetadata } from "@interface/document.interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import { documentDrawerAtom, selectedDocumentAtom } from "@atom/document";
import DocumentDeleteDialog from "@components/organisms/dialogs/document/documentDeleteDialog";
import DocumentEditDialog from "@components/organisms/dialogs/document/documentEditDialog";
import DocumentHideDialog from "@components/organisms/dialogs/document/documentHideDialog";
import DocumentVisibleDialog from "@components/organisms/dialogs/document/documentVisibleDialog";

interface IProps {
  document?: IDocumentMetadata;
  showDrawer?: boolean;
}

const DocumentMenu = ({ document, showDrawer }: IProps) => {
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const [editDocumentModal, setEditDocumentModal] = useState(false);
  const [deleteDocumentModal, setDeleteDocumentModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [editContentModal, setEditContentModal] = useState(false);
  const [documentTagsModal, setDocumentTagsModal] = useState(false);
  const [documentVersionsModal, setDocumentVersionsModal] = useState(false);
  const [documentAccessModal, setDocumentAccessModal] = useState(false);
  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);

  const [openDocumentActionDrawer, setOpenDocumentActionDrawer] =
    useRecoilState(documentDrawerAtom);

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: "ویرایش محتوا",
      onClick: () => {
        setEditContentModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "ویرایش سند",
      onClick: () => {
        setEditDocumentModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "انتقال",
      onClick: () => {
        setMoveModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "مشاهده نسخه های سند",
      onClick: () => {
        setDocumentVersionsModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "مشاهده تگ های سند",
      onClick: () => {
        setDocumentTagsModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "حذف سند",
      onClick: () => {
        setDeleteDocumentModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: document?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      onClick: () => {
        document?.isHidden ? setVisibleModal(true) : setHideModal(true);
      },
    },
    {
      text: "دسترسی سند",
      onClick: () => {
        setDocumentAccessModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
  ];

  return (
    <>
      {!!showDrawer ? (
        <div className="xs:hidden flex">
          <DrawerTemplate
            openDrawer={openDocumentActionDrawer}
            setOpenDrawer={setOpenDocumentActionDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <MenuTemplate
          setOpenDrawer={() => {
            setDocument(document || null);
            setOpenDocumentActionDrawer(true);
          }}
          menuList={menuList}
        />
      )}
      {deleteDocumentModal && (
        <DocumentDeleteDialog
          document={document}
          setOpen={() => {
            setDeleteDocumentModal(false);
          }}
        />
      )}

      {editDocumentModal && (
        <DocumentEditDialog
          document={document}
          setOpen={() => {
            setEditDocumentModal(false);
          }}
        />
      )}

      {hideModal && (
        <DocumentHideDialog
          document={document}
          setOpen={() => {
            setHideModal(false);
          }}
        />
      )}

      {visibleModal && (
        <DocumentVisibleDialog
          document={document}
          setOpen={() => {
            setVisibleModal(false);
          }}
        />
      )}
    </>
  );
};

export default DocumentMenu;
