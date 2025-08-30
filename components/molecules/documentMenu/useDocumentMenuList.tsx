import {
  ArrowLeftRectangleIcon,
  ConfirmationVersionIcon,
  CopyIcon,
  DeleteIcon,
  DocumentBookmarkIcon,
  DocumentTagsIcon,
  EditContentIcon,
  EditDocumentIcon,
  EditIcon,
  GlobeIcon,
  HiddenIcon,
  LastVersionIcon,
  LimitationIcon,
  LockIcon,
  PasswordIcon,
  PublishedLimitationIcon,
  VisibleIcon,
} from "@components/atoms/icons";
import { ERoles } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import React from "react";
import { toPersianDigit } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore, useDocumentDrawerStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { useEditorStore } from "@store/editor";

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
  documentDirectAccess: boolean;
  createPublishLink: boolean;
  deletePublishLink: boolean;
  documentPublicVersion: boolean;
  documentWhiteListRequests: boolean;
};

const useDocumentMenuList = ({ document, toggleModal }: UseDocumentMenuListProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const setDocument = useDocumentStore((state) => {
    return state.setSelectedDocument;
  });
  const setDocumentShow = useDocumentStore((state) => {
    return state.setDocumentShow;
  });
  const setShowVersionList = useVersionStore((state) => {
    return state.setVersionModalList;
  });
  const setEditorMode = useEditorStore((state) => {
    return state.setEditorMode;
  });
  const setEditorModal = useEditorStore((state) => {
    return state.setEditorModal;
  });
  const setOpenDocumentActionDrawer = useDocumentDrawerStore((state) => {
    return state.setDocumentDrawer;
  });
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePersonalDocs } = content;

  const adminOrOwnerRole = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === document?.repoId)
    ) {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId)
    ) {
      return document?.accesses?.[0] === "admin";
    }
    if (currentPath === "/admin/dashboard" && document?.accesses?.[0] === "admin") {
      return true;
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const editOptions = [
    {
      text: "ویرایش محتوا",
      icon: <EditContentIcon className="h-4 w-4" />,
      disabled: !adminOrOwnerRole(),
      onClick: () => {
        setEditorMode("edit");
        setEditorModal(true);
        setShowVersionList(false);
        if (document) {
          setDocument(document);
        }
      },
      className: "document-edit-content",
    },
    {
      text: "ویرایش سند",
      icon: <EditDocumentIcon className="h-4 w-4" />,
      disabled: !adminOrOwnerRole(),
      onClick: () => {
        toggleModal("editDocument", true);
        if (document) setDocument(document);
      },
      className: "document-edit",
    },
    {
      text: "تگ های سند",
      icon: <DocumentTagsIcon className="h-4 w-4" />,
      onClick: () => {
        toggleModal("documentTags", true);
        if (document) {
          setDocument(document);
        }
      },
      className: "document-edit-tags",
    },
  ];

  const publishLimitationDocOptions = [
    {
      text: document?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      icon: document?.isHidden ? (
        <VisibleIcon className="h-4 w-4" />
      ) : (
        <HiddenIcon className="h-4 w-4" />
      ),
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        currentPath === "/admin/dashboard" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal(document?.isHidden ? "visible" : "hide", true);
        setOpenDocumentActionDrawer(false);
        if (document) setDocument(document);
      },
      className: `${document?.isHidden ? "document-visible" : "document-hide"}`,
    },
    {
      text: "محدودیت کاربران",
      icon: <LimitationIcon className="h-4 w-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        currentPath === "/admin/dashboard" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("documentAccessPublishing", true);
        if (document) setDocument(document);
      },
      className: "document-limitation",
    },
    ...(document?.hasPassword
      ? [
          {
            text: "ویرایش رمز عبور",
            icon: <PasswordIcon className="h-4 w-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              currentPath === "/admin/dashboard" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("updatePassword", true);
              if (document) setDocument(document);
            },
            className: "document-edit-password",
          },
          {
            text: "حذف رمز عبور",
            icon: <PasswordIcon className="h-4 w-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              currentPath === "/admin/dashboard" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("deletePassword", true);
              if (document) setDocument(document);
            },
            className: "document-delete-password",
          },
        ]
      : [
          {
            text: "اعمال رمز عبور",
            icon: <PasswordIcon className="h-4 w-4" />,
            disabled:
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/sharedDocuments" ||
              currentPath === "/admin/dashboard" ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer ||
              getRepo?.roleName === ERoles.editor,
            onClick: () => {
              toggleModal("createPassword", true);
              if (document) setDocument(document);
            },
            className: "document-create-password",
          },
        ]),
  ];

  const publishDocOptions = [
    {
      text: " لینک انتشار",
      icon: <CopyIcon className="h-4 w-4 fill-icon-active" />,
      onClick: () => {
        const url = toPersianDigit(
          `/share/${toPersianDigit(
            `${getRepo?.name.replaceAll(/\s+/g, "-")}`,
          )}/${getRepo?.id}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
        );
        window.open(url, "_blank");
      },
      className: "document-copy-publish-link",
    },
    {
      text: "حذف لینک انتشار",
      icon: <DeleteIcon className="h-4 w-4" />,
      disabled:
        currentPath === "/admin/sharedDocuments" ||
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/dashboard" ||
        getRepo?.roleName !== ERoles.owner,
      onClick: () => {
        toggleModal("deletePublishLink", true);
        setOpenDocumentActionDrawer(false);
        if (document) setDocument(document);
      },
      className: "document-delete-publish-link",
    },
  ];

  const menuList = [
    {
      text: "ویرایش",
      subMenu: editOptions,
      onClick: () => {},
      icon: <EditIcon className="h-4 w-4" />,
    },
    {
      text: document?.isBookmarked ? "حذف بوکمارک" : "بوکمارک کردن",
      icon: <DocumentBookmarkIcon className="h-4 w-4" />,
      disabled:
      (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id) ||
      currentPath === "/admin/sharedDocuments",
      onClick: () => {
        toggleModal("bookmarkDocument", true);
        setOpenDocumentActionDrawer(false);
        if (document) setDocument(document);
      },
      className: `${document?.isBookmarked ? "document-delete-bookmark" : "document-bookmark"}`,
    },
    {
      text: "انتقال",
      icon: <ArrowLeftRectangleIcon className="h-4 w-4 fill-icon-active" />,
      disabled:
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id) ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("move", true);
        if (document) setDocument(document);
      },
      className: "document-move",
    },
    {
      text: "نسخه های سند",
      icon: <LastVersionIcon className="h-4 w-4" />,
      onClick: () => {
        setShowVersionList(true);
        if (document) {
          setDocument(document);
          setDocumentShow(document);
        }
      },
      className: "document-version-list",
    },
    {
      text: "عمومی سازی آخرین نسخه",
      icon: <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      disabled: !adminOrOwnerRole(),
      onClick: () => {
        toggleModal("documentPublicVersion", true);
        setOpenDocumentActionDrawer(false);
        if (document) setDocument(document);
      },
      className: "document-public-version",
    },
    {
      text: "دسترسی مستقیم به سند",
      icon: <LockIcon className="h-4 w-4" />,
      disabled: !enablePersonalDocs && !adminOrOwnerRole(),
      onClick: () => {
        toggleModal("documentDirectAccess", true);
        if (document) setDocument(document);
      },
      className: "document-direct-access",
    },
    {
      text: "محدودیت دسترسی در پنل",
      icon: <LockIcon className="h-4 w-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments" ||
        currentPath === "/admin/dashboard" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("documentAccess", true);
        if (document) setDocument(document);
      },
      className: "document-access",
    },
    ...(document?.hasWhiteList ? 
      [{
        text: "درخواست‌های دسترسی به سند",
        icon: <LockIcon className="h-4 w-4" />,
        disabled:
          currentPath === "/admin/myDocuments" ||
          currentPath === "/admin/sharedDocuments" ||
          currentPath === "/admin/dashboard" ||
          getRepo?.roleName === ERoles.writer ||
          getRepo?.roleName === ERoles.viewer ||
          getRepo?.roleName === ERoles.editor,
        onClick: () => {
          toggleModal("documentWhiteListRequests", true);
          if (document) setDocument(document);
        },
        className: "document-white-list-requests",
      }] : []),
    ...(document?.isPublish
      ? [
          {
            text: "سند منتشر شده",
            subMenu: publishDocOptions,
            onClick: () => {},
            icon: <GlobeIcon className="h-4 w-4 fill-icon-active" />,
          },
        ]
      : [
          {
            text: "ایجاد لینک انتشار",
            icon: <GlobeIcon className="h-4 w-4 fill-icon-active" />,
            disabled:
              currentPath === "/admin/sharedDocuments" ||
              currentPath === "/admin/myDocuments" ||
              currentPath === "/admin/dashboard" ||
              getRepo?.roleName === ERoles.admin ||
              getRepo?.roleName === ERoles.editor ||
              getRepo?.roleName === ERoles.writer ||
              getRepo?.roleName === ERoles.viewer,
            onClick: () => {
              toggleModal("createPublishLink", true);
              if (document) setDocument(document);
            },
            className: "document-create-publish-link",
          },
        ]),
    {
      text: "محدودیت در انتشار",
      icon: <PublishedLimitationIcon className="h-4 w-4" />,
      subMenu: publishLimitationDocOptions,
      onClick: () => {},
    },
    {
      text: "حذف سند",
      icon: <DeleteIcon className="h-4 w-4" />,
      disabled:
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id) ||
        (getRepo?.roleName === ERoles.writer &&
          document?.creator?.userName !== userInfo?.username) ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("deleteDocument", true);
        setOpenDocumentActionDrawer(false);
        if (document) setDocument(document);
      },
      className: "document-delete",
    },
  ];

  return menuList;
};

export default useDocumentMenuList;
