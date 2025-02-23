import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IDocumentMetadata } from "@interface/document.interface";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import { editorModalAtom, editorModeAtom } from "@atom/editor";
import {
  ArrowLeftRectangleIcon,
  DeleteIcon,
  DocumentBookmarkIcon,
  DocumentTagsIcon,
  EditContentIcon,
  EditDocumentIcon,
  EditIcon,
  HiddenIcon,
  LastVersionIcon,
  LimitationIcon,
  LockIcon,
  PasswordIcon,
  PublishedLimitationIcon,
  VisibleIcon,
} from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

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
  documentDirectAccess: false;
};

const useDocumentMenuList = ({
  document,
  toggleModal,
}: UseDocumentMenuListProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setDocumentShow = useSetRecoilState(documentShowAtom);
  const setShowVersionList = useSetRecoilState(versionModalListAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const editOptions = [
    {
      text: "ویرایش محتوا",
      icon: <EditContentIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        setEditorMode("edit");
        setEditorModal(true);
        setShowVersionList(false);
        if (document) {
          setDocument(document);
        }
      },
    },
    {
      text: "ویرایش سند",
      icon: <EditDocumentIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("editDocument", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "تگ های سند",
      icon: <DocumentTagsIcon className="w-4 h-4" />,
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
      icon: document?.isHidden ? (
        <VisibleIcon className="w-4 h-4" />
      ) : (
        <HiddenIcon className="w-4 h-4" />
      ),
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal(document?.isHidden ? "visible" : "hide", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "محدودیت کاربران",
      icon: <LimitationIcon className="w-4 h-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("documentAccessPublishing", true);
        if (document) setDocument(document);
      },
    },
    ...(document?.hasPassword
      ? [
          {
            text: "ویرایش رمز عبور",
            icon: <PasswordIcon className="w-4 h-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("updatePassword", true);
              if (document) setDocument(document);
            },
          },
          {
            text: "حذف رمز عبور",
            icon: <PasswordIcon className="w-4 h-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("deletePassword", true);
              if (document) setDocument(document);
            },
          },
        ]
      : [
          {
            text: "اعمال رمز عبور",
            icon: <PasswordIcon className="w-4 h-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("createPassword", true);
              if (document) setDocument(document);
            },
          },
        ]),
  ];

  const menuList = [
    {
      text: "ویرایش",
      subMenu: editOptions,
      onClick: () => {},
      icon: <EditIcon className="w-4 h-4" />,
    },
    {
      text: document?.isBookmarked ? "حذف بوکمارک" : "بوکمارک کردن",
      icon: <DocumentBookmarkIcon className="w-4 h-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments",
      onClick: () => {
        toggleModal("bookmarkDocument", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "انتقال",
      icon: <ArrowLeftRectangleIcon className="w-4 h-4 fill-icon-active" />,
      disabled:
        currentPath === "/admin/sharedDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("move", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "نسخه های سند",
      icon: <LastVersionIcon className="w-4 h-4" />,
      onClick: () => {
        setShowVersionList(true);
        if (document) {
          setDocument(document);
          setDocumentShow(document);
        }
      },
    },
    {
      text: "دسترسی مستقیم به سند",
      icon: <LockIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("documentDirectAccess", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "محدودیت دسترسی در پنل",
      icon: <LockIcon className="w-4 h-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("documentAccess", true);
        if (document) setDocument(document);
      },
    },
    {
      text: "محدودیت در انتشار",
      icon: <PublishedLimitationIcon className="w-4 h-4" />,
      subMenu: publishDocOptions,
      onClick: () => {},
    },
    {
      text: "حذف سند",
      icon: <DeleteIcon className="w-4 h-4" />,
      disabled:
        currentPath === "/admin/sharedDocuments" ||
        (getRepo?.roleName === ERoles.writer &&
          document?.creator?.userName !== userInfo?.username) ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("deleteDocument", true);
        if (document) setDocument(document);
      },
    },
  ];

  return menuList;
};

export default useDocumentMenuList;
