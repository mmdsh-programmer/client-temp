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
import DocumentMoveDialog from "@components/organisms/dialogs/document/documentMoveDialog";
import { MoreDotIcon } from "@components/atoms/icons";
import DocumentBookmarkDialog from "@components/organisms/dialogs/document/documentBookmarkDialog";
import DocumentAccessDialog from "@components/organisms/dialogs/document/documentAccessDialog";
import DocumentTagsDialog from "@components/organisms/dialogs/document/documentTagsDialog";
import DocumentAccessPublishingDialog from "@components/organisms/dialogs/document/documentAccessPublishingDialog";
import DocumentCreatePasswordDialog from "@components/organisms/dialogs/document/documentCreatePasswordDialog";
import DocumentUpdatePasswordDialog from "@components/organisms/dialogs/document/documentUpdatePasswordDialog";
import DocumentDeletePasswordDialog from "@components/organisms/dialogs/document/documentDeletePasswordDialog";
import { versionListAtom } from "@atom/version";
import { editorModeAtom } from "@atom/editor";
import Editor from "@components/organisms/dialogs/editor";
import DocumentLastVersion from "@components/organisms/document/documentLastVersion";

interface IProps {
  document?: IDocumentMetadata;
  showDrawer?: boolean;
}

const DocumentMenu = ({ document, showDrawer }: IProps) => {
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setShowVersionList = useSetRecoilState(versionListAtom);
  const [editDocumentModal, setEditDocumentModal] = useState(false);
  const [deleteDocumentModal, setDeleteDocumentModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [editContentModal, setEditContentModal] = useState(false);
  const [documentTagsModal, setDocumentTagsModal] = useState(false);
  const [documentAccessModal, setDocumentAccessModal] = useState(false);
  const [bookmarkDocumentModal, setBookmarkDocumentModal] = useState(false);
  const [createPasswordDocumentModal, setCreatePasswordDocumentModal] =
    useState(false);
  const [updatePasswordDocumentModal, setUpdatePasswordDocumentModal] =
    useState(false);
  const [deletePasswordDocumentModal, setDeletePasswordDocumentModal] =
    useState(false);
  const [documentAccessPublishingModal, setDocumentAccessPublishingModal] =
    useState(false);

  const [openDocumentActionDrawer, setOpenDocumentActionDrawer] =
    useRecoilState(documentDrawerAtom);

  const setEditorMode = useSetRecoilState(editorModeAtom);

  const editOptions = [
    {
      text: "ویرایش محتوا",
      onClick: () => {
        setEditContentModal(true);
        setEditorMode("preview");
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
      text: "تگ های سند",
      onClick: () => {
        setDocumentTagsModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
  ];

  const publishDocOptions = [
    {
      text: document?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      onClick: () => {
        document?.isHidden ? setVisibleModal(true) : setHideModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "محدودیت کاربران",
      onClick: () => {
        setDocumentAccessPublishingModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    ...(document?.hasPassword
      ? [
          {
            text: "ویرایش رمز عبور",
            onClick: () => {
              setUpdatePasswordDocumentModal(true);
              if (document) {
                setDocument(document);
              }
            },
          },
          {
            text: "حذف رمز عبور",
            onClick: () => {
              setDeletePasswordDocumentModal(true);
              if (document) {
                setDocument(document);
              }
            },
          },
        ]
      : [
          {
            text: "اعمال رمز عبور",
            onClick: () => {
              setCreatePasswordDocumentModal(true);
              if (document) {
                setDocument(document);
              }
            },
          },
        ]),
  ];

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
    subMenu?: { text: string; icon?: React.JSX.Element; onClick: () => void }[];
  }[] = [
    {
      text: "ویرایش",
      subMenu: editOptions,
      onClick: () => {},
    },
    {
      text: document?.isBookmarked ? "حذف بوکمارک" : "بوکمارک کردن",
      onClick: () => {
        setBookmarkDocumentModal(true);
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
      text: "نسخه های سند",
      onClick: () => {
        setShowVersionList(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "محدودیت دسترسی در پنل",
      onClick: () => {
        setDocumentAccessModal(true);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "محدودیت در انتشار",
      subMenu: publishDocOptions,
      onClick: () => {},
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
          icon={
            <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
              <MoreDotIcon className="w-4 h-4" />
            </div>
          }
        />
      )}
      {deleteDocumentModal && (
        <DocumentDeleteDialog
          setOpen={() => {
            setDeleteDocumentModal(false);
          }}
        />
      )}
      {editDocumentModal && (
        <DocumentEditDialog
          setOpen={() => {
            setEditDocumentModal(false);
          }}
        />
      )}
      {hideModal && (
        <DocumentHideDialog
          setOpen={() => {
            setHideModal(false);
          }}
        />
      )}
      {visibleModal && (
        <DocumentVisibleDialog
          setOpen={() => {
            setVisibleModal(false);
          }}
        />
      )}
      {moveModal && <DocumentMoveDialog setOpen={() => setMoveModal(false)} />}
      {bookmarkDocumentModal && (
        <DocumentBookmarkDialog
          setOpen={() => setBookmarkDocumentModal(false)}
        />
      )}
      {documentAccessModal && (
        <DocumentAccessDialog setOpen={() => setDocumentAccessModal(false)} />
      )}
      {documentTagsModal && (
        <DocumentTagsDialog setOpen={() => setDocumentTagsModal(false)} />
      )}
      {documentAccessPublishingModal && (
        <DocumentAccessPublishingDialog
          setOpen={() => setDocumentAccessPublishingModal(false)}
        />
      )}
      {createPasswordDocumentModal && (
        <DocumentCreatePasswordDialog
          setOpen={() => setCreatePasswordDocumentModal(false)}
        />
      )}
      {updatePasswordDocumentModal && (
        <DocumentUpdatePasswordDialog
          setOpen={() => setUpdatePasswordDocumentModal(false)}
        />
      )}
      {deletePasswordDocumentModal && (
        <DocumentDeletePasswordDialog
          setOpen={() => setDeletePasswordDocumentModal(false)}
        />
      )}
      {editContentModal && (
        <Editor setOpen={() => setEditContentModal(false)} />
      )}
      {editContentModal && (
        <DocumentLastVersion />
      )}
    </>
  );
};

export default DocumentMenu;
