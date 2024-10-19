import { useSetRecoilState } from "recoil";
import { IDocumentMetadata } from "@interface/document.interface";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionListAtom } from "@atom/version";
import { editorModeAtom } from "@atom/editor";

interface UseDocumentMenuListProps {
  document?: IDocumentMetadata;
  toggleModal: (modalName: keyof Modals, value: boolean) => void;
}

type Modals = {
  editDocument: boolean;
  deleteDocument: boolean;
  move: boolean;
  hide: boolean;
  visible: boolean;
  editContent: boolean;
  documentTags: boolean;
  documentAccess: boolean;
  bookmarkDocument: boolean;
  createPassword: boolean;
  updatePassword: boolean;
  deletePassword: boolean;
  documentAccessPublishing: boolean;
};

const useDocumentMenuList = ({
  document,
  toggleModal,
}: UseDocumentMenuListProps) => {
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setShowVersionList = useSetRecoilState(versionListAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);

  const editOptions = [
    {
      text: "ویرایش محتوا",
      onClick: () => {
        toggleModal("editContent", true);
        setEditorMode("preview");
        if (document) setDocument(document);
      },
    },
    {
      text: "ویرایش سند",
      onClick: () => {
        toggleModal("editDocument", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "تگ های سند",
      onClick: () => {
        toggleModal("documentTags", true);
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
        toggleModal(document?.isHidden ? "visible" : "hide", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "محدودیت کاربران",
      onClick: () => {
        toggleModal("documentAccessPublishing", true);
        if (document) setDocument(document);
      },
    },
    ...(document?.hasPassword
      ? [
          {
            text: "ویرایش رمز عبور",
            onClick: () => {
              toggleModal("updatePassword", true);
              if (document) setDocument(document);
            },
          },
          {
            text: "حذف رمز عبور",
            onClick: () => {
              toggleModal("deletePassword", true);
              if (document) setDocument(document);
            },
          },
        ]
      : [
          {
            text: "اعمال رمز عبور",
            onClick: () => {
              toggleModal("createPassword", true);
              if (document) setDocument(document);
            },
          },
        ]),
  ];

  const menuList = [
    { text: "ویرایش", subMenu: editOptions, onClick: () => {} },
    {
      text: document?.isBookmarked ? "حذف بوکمارک" : "بوکمارک کردن",
      onClick: () => {
        toggleModal("bookmarkDocument", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "انتقال",
      onClick: () => {
        toggleModal("move", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "نسخه های سند",
      onClick: () => {
        setShowVersionList(true);
        if (document) {
          setDocument(document);
          setDocumentShow(document);
        }
      },
    },
    {
      text: "محدودیت دسترسی در پنل",
      onClick: () => {
        toggleModal("documentAccess", true);
        if (document) setDocument(document);
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
        toggleModal("deleteDocument", true);
        if (document) setDocument(document);
      },
    },
  ];

  return menuList;
};

export default useDocumentMenuList;
