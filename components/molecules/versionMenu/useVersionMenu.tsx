import React from "react";
import {
  CancelVersionIcon,
  ComparisionIcon,
  ConfirmationVersionIcon,
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  GlobeIcon,
  LastVersionIcon,
  ShareIcon,
} from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import { EDocumentTypes, EDraftStatus, EVersionStatus } from "@interface/enums";
import { useEditorStore } from "@store/editor";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { MenuItem } from "@components/templates/menuTemplate";

const createItem = (
  text: string,
  icon: JSX.Element,
  onClick: () => void,
  options: { className?: string; disabled?: boolean } = {},
): MenuItem => {
  return { text, icon, onClick, ...options };
};

const useRoles = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument: getDocument } = useDocumentStore();
  const { data: userInfo } = useGetUser();
  const currentPath = usePathname();

  const isAdminOrOwner = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId)
    )
      return true;

    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
    )
      return getDocument?.accesses?.[0] === "admin";

    return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
  };

  const isWriterOrViewer = () => {
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
    )
      return ["viewer", "writer"].includes(getDocument?.accesses?.[0] ?? "");

    return ["viewer", "writer"].includes(getRepo?.roleName ?? "");
  };

  return { isAdminOrOwner, isWriterOrViewer };
};

const useVersionMenu = (
  version: IVersion | null,
  lastVersion: IVersion | undefined,
  setModal: (modalName: string) => void,
): MenuItem[] => {
  const { selectedDocument: getDocument } = useDocumentStore();
  const { setSelectedVersion, compareVersion, setCompareVersion, setVersionModalList } =
    useVersionStore();
  const { setEditorMode, setEditorModal, setEditorData: setVersionData } = useEditorStore();
  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();
  const { isAdminOrOwner, isWriterOrViewer } = useRoles();

  if (!version || !getDocument) return [];

  const createAction = (modalName: string) => {
    return () => {
      setSelectedVersion(version);
      setModal(modalName);
    };
  };

  const defaultOptions: MenuItem[] = [
    createItem(
      "ایجاد نسخه جدید",
      <DuplicateIcon className="h-4 w-4 stroke-icon-active" />,
      createAction("clone"),
      {
        className: "clone-version",
        disabled: isWriterOrViewer() && version.creator?.userName !== userInfo?.username,
      },
    ),
    createItem(
      "ویرایش",
      <EditIcon className="h-4 w-4" />,
      () => {
        setSelectedVersion(version);
        setEditorMode("edit");
        setEditorModal(true);
        setVersionModalList(false);
        setVersionData(null);
      },
      {
        className: "edit-version",
        disabled: isWriterOrViewer() && version.creator?.userName !== userInfo?.username,
      },
    ),
    createItem(
      compareVersion?.version ? "مقایسه با نسخه مورد نظر" : "مقایسه",
      <ComparisionIcon className="h-4 w-4 stroke-icon-active" />,
      () => {
        setSelectedVersion(version);
        if (repoId && getDocument && compareVersion?.version) {
          setCompareVersion({
            ...compareVersion,
            compare: { data: version, repoId, document: getDocument },
          });
          setModal("compare");
        } else if (repoId && getDocument) {
          setCompareVersion({
            version: { data: version, repoId, document: getDocument },
            compare: null,
          });
        }
      },
      {
        className: "compare-version",
        disabled: getDocument.contentType !== EDocumentTypes.classic,
      },
    ),
  ];

  const draftOptions: MenuItem[] = [
    createItem(
      "تایید و عمومی‌سازی پیش‌نویس",
      <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      createAction("publicDraft"),
      {
        className: "confirmPublic-draft",
        disabled: !isAdminOrOwner(),
      },
    ),
    createItem(
      version.status === "editing" ? "تایید پیش نویس" : "عدم تایید پیش نویس",
      version.status === "editing" ? (
        <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />
      ) : (
        <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />
      ),
      createAction(version.status === "editing" ? "confirm" : "cancelConfirm"),
      { className: version.status === "editing" ? "confirm-version" : "cancel-confirm-version" },
    ),
    ...(version.status === EDraftStatus.pending && isAdminOrOwner()
      ? [
          createItem(
            "تایید درخواست تایید پیش نویس",
            <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
            createAction("acceptConfirmDraft"),
          ),
        ]
      : []),
  ];

  const privateOptions: MenuItem[] = [
    ...(isAdminOrOwner()
      ? [
          createItem(
            version.status === "private" ? "ارسال درخواست عمومی شدن" : "لغو درخواست عمومی شدن نسخه",
            version.status === "private" ? (
              <GlobeIcon className="h-4 w-4 fill-icon-active" />
            ) : (
              <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />
            ),
            createAction(version.status === "private" ? "public" : "cancelPublic"),
            {
              className: version.status === "private" ? "public-version" : "cancel-public-version",
            },
          ),
        ]
      : []),
    ...(version.id !== lastVersion?.id
      ? [
          createItem(
            "انتخاب به عنوان آخرین نسخه",
            <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
            createAction("lastVersion"),
            {
              className: "set-last-version",
            },
          ),
        ]
      : []),
    ...(version.status === EVersionStatus.pending && isAdminOrOwner()
      ? [
          createItem(
            "تایید درخواست عمومی شدن",
            <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
            createAction("acceptPublicVersion"),
          ),
        ]
      : []),
  ];

  const publicOptions: MenuItem[] = [
    ...(version.id !== lastVersion?.id
      ? [
          createItem(
            "انتخاب به عنوان آخرین نسخه",
            <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
            createAction("lastVersion"),
            {
              className: "set-last-version",
            },
          ),
        ]
      : []),
    ...(version.status === EDraftStatus.waitForDirectPublic && isAdminOrOwner()
      ? [
          createItem(
            "تایید درخواست تایید و عمومی شدن",
            <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
            createAction("acceptPublicDraft"),
          ),
          createItem(
            "رد درخواست تایید و عمومی شدن",
            <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />,
            createAction("rejectPublicDraft"),
          ),
        ]
      : []),
  ];

  const footerOptions: MenuItem[] = [
    createItem(
      "کپی هش فایل",
      <CopyIcon className="h-4 w-4 fill-icon-active stroke-[1.5]" />,
      () => {
        if (version.hash) {
          copy(version.hash);
          toast.success("هش مربوط به پیش نویس کپی شد.");
        }
      },
      { className: "copy-version-hash" },
    ),
    createItem(
      "کپی آدرس اشتراک‌ گذاری",
      <ShareIcon className="h-4 w-4 stroke-icon-active" />,
      () => {
        copy(`${window.location.href}&versionId=${version.id}&versionState=${version.state}`);
        toast.success("آدرس کپی شد.");
      },
      { className: "copy-version-url" },
    ),
    createItem(
      version.state === "draft" ? "حذف پیش نویس" : "حذف نسخه",
      <DeleteIcon className="h-4 w-4" />,
      createAction("delete"),
      {
        className: "delete-version",
        disabled: isWriterOrViewer() && version.creator?.userName !== userInfo?.username,
      },
    ),
  ];

  const menuItems: MenuItem[] = [...defaultOptions];

  if (version.status === "editing" || (version.status === "pending" && version.state === "draft")) {
    menuItems.push(...draftOptions);
  } else if (
    version.status === "private" ||
    (version.status === "pending" && version.state === "version")
  ) {
    menuItems.push(...privateOptions);
  } else {
    menuItems.push(...publicOptions);
  }

  return [...menuItems, ...footerOptions];
};

export default useVersionMenu;
