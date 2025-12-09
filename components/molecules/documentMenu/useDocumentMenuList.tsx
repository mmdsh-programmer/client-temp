import React from "react";
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
import { EDocumentTypes, ERoles } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { toPersianDigit } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useRepositoryStore } from "@store/repository";
import { useDocumentDrawerStore, useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { useEditorStore } from "@store/editor";
import { MenuItem } from "@components/templates/menuTemplate";
import useCollaborateFormVersion from "@hooks/formVersion/useCollaborateFormVersion";
import useAutoLoginCode from "@hooks/autoLogin/useAutoLoginCode";
import useRepoId from "@hooks/custom/useRepoId";
import useCreateLastVersionLink from "@hooks/version/useCreateLastVersionLink";
import { toast } from "react-toastify";

const createItem = (
  text: string,
  icon: React.JSX.Element,
  onClick: () => void,
  options: { className?: string; disabled?: boolean; subMenu?: MenuItem[] } = {},
): MenuItem => {
  return {
    text,
    icon,
    onClick,
    className: options.className,
    disabled: options.disabled || false,
    subMenu: options.subMenu,
  };
};

const useDocumentMenuList = (
  document: IDocumentMetadata | null,
  setModal: (modalName: string) => void,
): MenuItem[] => {
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setDocumentDrawer } = useDocumentDrawerStore();
  const { setVersionModalList } = useVersionStore();
  const { setEditorMode, setEditorModal } = useEditorStore();
  const { repo, setRepositoryId } = useRepositoryStore();
  const repoId = useRepoId();

  const pathname = usePathname();
  const { data: userInfo } = useGetUser();
  const { data: getDomainInfo } = useGetDomainInfo();
  const createLastVersionLink = useCreateLastVersionLink();
  const collaborateFrom = useCollaborateFormVersion();
  const autoLogin = useAutoLoginCode();

  if (!document) return [];

  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePersonalDocs } = content;
  const role = repo?.roleName;

  const isLimitedOnPanel = [
    "/admin/myDocuments",
    "/admin/sharedDocuments",
    "/admin/dashboard",
  ].some((p) => {
    return pathname.startsWith(p);
  });

  const isAdminOrOwner = () => {
    if (
      pathname === "/admin/myDocuments" ||
      (pathname === "/admin/dashboard" && userInfo?.repository.id === document?.repoId)
    )
      return true;
    if (
      pathname === "/admin/sharedDocuments" ||
      (pathname === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId)
    )
      return document?.accesses?.[0] === "admin";
    return role === "admin" || role === "owner";
  };

  const handleOpenFormEditor = () => {
    if (!repoId) {
      console.error("شناسه مخزن وجود ندارد.");
      return;
    }
    createLastVersionLink.mutate({
      repoId,
      documentId: document.id,
      isDirectAccess:
        pathname === "/admin/sharedDocuments" ||
        (pathname === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId),
      callBack: (lastVersion) => {
        if (!lastVersion) {
          toast.error("این سند فاقد آخرین نسخه است.");
          return;
        }
        collaborateFrom.mutate({
          repoId,
          documentId: document!.id,
          versionId: lastVersion!.id,
          callBack: () => {
            autoLogin.mutate({
              callBack: (code) => {
                const url = `${process.env.NEXT_PUBLIC_PODFORM_URL}/app/auto-login?form_Id=${lastVersion!.formId}&auto_login_code=${code}&embed=false`;
                window.open(url);
              },
            });
          },
        });
      },
    });
  };

  const restrictedRoles = [ERoles.writer, ERoles.viewer, ERoles.editor];

  const editSubMenuItems: MenuItem[] = [
    createItem(
      "ویرایش محتوا",
      <EditContentIcon className="h-4 w-4" />,
      () => {
        if (document.contentType === EDocumentTypes.form) {
          return handleOpenFormEditor();
        }
        setEditorMode("edit");
        setEditorModal(true);
        setVersionModalList(false);
        setSelectedDocument(document);
      },
      { className: "document-edit-content", disabled: !isAdminOrOwner() },
    ),
    createItem(
      "ویرایش سند",
      <EditDocumentIcon className="h-4 w-4" />,
      () => {
        return setModal("editDocument");
      },
      {
        className: "document-edit",
        disabled: !isAdminOrOwner(),
      },
    ),
    createItem(
      "تگ های سند",
      <DocumentTagsIcon className="h-4 w-4" />,
      () => {
        return setModal("documentTags");
      },
      {
        className: "document-edit-tags",
      },
    ),
  ];

  const publishLimitationSubMenuItems: MenuItem[] = [
    createItem(
      document.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      document.isHidden ? <VisibleIcon className="h-4 w-4" /> : <HiddenIcon className="h-4 w-4" />,
      () => {
        setModal(document.isHidden ? "visible" : "hide");
        setDocumentDrawer(false);
      },
      {
        className: document.isHidden ? "document-visible" : "document-hide",
        disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
      },
    ),
    createItem(
      "محدودیت کاربران",
      <LimitationIcon className="h-4 w-4" />,
      () => {
        return setModal("documentAccessPublishing");
      },
      {
        className: "document-limitation",
        disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
      },
    ),
    ...(document.hasPassword
      ? [
          createItem(
            "ویرایش رمز عبور",
            <PasswordIcon className="h-4 w-4" />,
            () => {
              return setModal("updatePassword");
            },
            {
              className: "document-edit-password",
              disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
            },
          ),
          createItem(
            "حذف رمز عبور",
            <PasswordIcon className="h-4 w-4" />,
            () => {
              return setModal("deletePassword");
            },
            {
              className: "document-delete-password",
              disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
            },
          ),
        ]
      : [
          createItem(
            "اعمال رمز عبور",
            <PasswordIcon className="h-4 w-4" />,
            () => {
              return setModal("createPassword");
            },
            {
              className: "document-create-password",
              disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
            },
          ),
        ]),
  ];

  const publishDocSubMenuItems: MenuItem[] = [
    createItem(
      "لینک انتشار",
      <CopyIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        const url = toPersianDigit(
          `/share/${toPersianDigit(`${document.repoName?.replaceAll(/\s+/g, "-")}`)}/${document.repoId}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
        );
        window.open(url, "_blank");
      },
      { className: "document-copy-publish-link" },
    ),
    createItem(
      "حذف لینک انتشار",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        setModal("deletePublishLink");
        setDocumentDrawer(false);
      },
      {
        className: "document-delete-publish-link",
        disabled: isLimitedOnPanel || role !== ERoles.owner,
      },
    ),
  ];

  const menuItems: MenuItem[] = [
    createItem("ویرایش", <EditIcon className="h-4 w-4" />, () => {}, { subMenu: editSubMenuItems }),
    createItem(
      document.isBookmarked ? "حذف بوکمارک" : "بوکمارک کردن",
      <DocumentBookmarkIcon className="h-4 w-4" />,
      () => {
        setModal("bookmarkDocument");
        setDocumentDrawer(false);
      },
      {
        className: document.isBookmarked ? "document-delete-bookmark" : "document-bookmark",
        disabled:
          (pathname.startsWith("/admin/dashboard") &&
            document.repoId !== userInfo?.repository.id) ||
          pathname.startsWith("/admin/sharedDocuments"),
      },
    ),
    createItem(
      "انتقال",
      <ArrowLeftRectangleIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        return setModal("move");
      },
      {
        className: "document-move",
        disabled:
          pathname.startsWith("/admin/sharedDocuments") ||
          (pathname.startsWith("/admin/dashboard") &&
            document.repoId !== userInfo?.repository.id) ||
          (role ? restrictedRoles.includes(role) : false),
      },
    ),
    createItem(
      "نسخه های سند",
      <LastVersionIcon className="h-4 w-4" />,
      () => {
        setVersionModalList(true);
        setDocumentShow(document);
        setSelectedDocument(document);
        if (pathname !== "/admin/repositories") {
          setRepositoryId(document.repoId);
        }
      },
      { className: "document-version-list" },
    ),
    createItem(
      "عمومی سازی آخرین نسخه",
      <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        setModal("documentPublicVersion");
        setDocumentDrawer(false);
      },
      { className: "document-public-version", disabled: !isAdminOrOwner() },
    ),
    createItem(
      "دسترسی مستقیم به سند",
      <LockIcon className="h-4 w-4" />,
      () => {
        return setModal("documentDirectAccess");
      },
      { className: "document-direct-access", disabled: !!enablePersonalDocs && !isAdminOrOwner() },
    ),
    createItem(
      "محدودیت دسترسی در پنل",
      <LockIcon className="h-4 w-4" />,
      () => {
        return setModal("documentAccess");
      },
      {
        className: "document-access",
        disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
      },
    ),
  ];

  if (document.hasWhiteList) {
    menuItems.push(
      createItem(
        "درخواست‌های دسترسی به سند",
        <LockIcon className="h-4 w-4" />,
        () => {
          return setModal("documentWhiteListRequests");
        },
        {
          className: "document-white-list-requests",
          disabled: isLimitedOnPanel || (role ? restrictedRoles.includes(role) : false),
        },
      ),
    );
  }

  if (document.isPublish) {
    menuItems.push(
      createItem("سند منتشر شده", <GlobeIcon className="h-4 w-4 fill-icon-active" />, () => {}, {
        subMenu: publishDocSubMenuItems,
      }),
    );
  } else {
    menuItems.push(
      createItem(
        "ایجاد لینک انتشار",
        <GlobeIcon className="h-4 w-4 fill-icon-active" />,
        () => {
          return setModal("createPublishLink");
        },
        {
          className: "document-create-publish-link",
          disabled: isLimitedOnPanel || role !== ERoles.owner,
        },
      ),
    );
  }

  menuItems.push(
    createItem("محدودیت در انتشار", <PublishedLimitationIcon className="h-4 w-4" />, () => {}, {
      subMenu: publishLimitationSubMenuItems,
    }),
  );

  if (getDomainInfo?.hasQuestions) {
    menuItems.push(
      createItem(
        "پرسش و پاسخ روی سند",
        <LastVersionIcon className="h-4 w-4" />,
        () => {
          setModal("documentQA");
          setDocumentDrawer(false);
        },
        { className: "document-question-answer" },
      ),
    );
  }

  menuItems.push(
    createItem(
      "حذف سند",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        setModal("deleteDocument");
        setDocumentDrawer(false);
      },
      {
        className: "document-delete",
        disabled:
          pathname.startsWith("/admin/sharedDocuments") ||
          (pathname.startsWith("/admin/dashboard") &&
            document.repoId !== userInfo?.repository.id) ||
          (role === ERoles.writer && document.creator?.userName !== userInfo?.username) ||
          role === ERoles.viewer,
      },
    ),
  );

  return menuItems;
};

export default useDocumentMenuList;
