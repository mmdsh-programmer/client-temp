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
import { EDocumentTypes, EDraftStatus, ERoles, EVersionStatus } from "@interface/enums";
import { useEditorStore } from "@store/editor";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";

interface MenuItem {
  text: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick: () => void;
}

type ModalType = {
  compare: boolean;
  delete: boolean;
  edit: boolean;
  clone: boolean;
  confirm: boolean;
  cancelConfirm: boolean;
  public: boolean;
  cancelPublic: boolean;
  lastVersion: boolean;
  publicDraft: boolean;
  acceptConfirmDraft: boolean;
  acceptPublicVersion: boolean;
  acceptPublicDraft: boolean;
  rejectPublicDraft: boolean;
};

const useVersionMenuList = (
  version: IVersion | null,
  lastVersion: IVersion | undefined,
  toggleModal: (modalName: keyof ModalType, value: boolean) => void,
): MenuItem[] => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });
  const {
    setSelectedVersion: setVersion,
    compareVersion,
    setCompareVersion,
    setVersionModalList,
    setVersionDrawer: setOpenVersionActionDrawer,
  } = useVersionStore();
  const { setEditorMode, setEditorModal, setEditorData: setVersionData } = useEditorStore();

  const currentPath = usePathname();

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId)
    ) {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
    ) {
      return getDocument?.accesses?.[0] === "admin";
    }
    if (currentPath === "/admin/dashboard" && getDocument?.accesses?.[0] === "admin") {
      return true;
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const writerOrViewerRole = () => {
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
    ) {
      return getDocument?.accesses?.[0] === "viewer" || getDocument?.accesses?.[0] === "writer";
    }
    if (getRepo) {
      return getRepo?.roleName === "viewer" || getRepo?.roleName === "writer";
    }
  };

  const defaultOptions = (otherOption: MenuItem[]) => {
    return [
      {
        text: "ایجاد نسخه جدید از نسخه",
        icon: <DuplicateIcon className="h-4 w-4 stroke-icon-active" />,
        disabled: writerOrViewerRole() && version?.creator?.userName !== userInfo?.username,
        onClick: () => {
          toggleModal("clone", true);
          if (version) {
            setVersion(version);
          }
        },
        className: "clone-version",
      },
      {
        text: "ویرایش",
        icon: <EditIcon className="h-4 w-4" />,
        disabled: writerOrViewerRole() && version?.creator?.userName !== userInfo?.username,
        onClick: () => {
          setVersion(version);
          setEditorMode("edit");
          setEditorModal(true);
          setVersionModalList(false);
          setVersionData(null);
        },
        className: "edit-version",
      },

      {
        text: compareVersion?.version ? "مقایسه با نسخه مورد نظر" : "مقایسه",
        icon: <ComparisionIcon className="h-4 w-4 stroke-icon-active" />,
        disabled: getDocument?.contentType !== EDocumentTypes.classic,
        onClick: () => {
          if (version) {
            setVersion(version);
          }
          if (repoId && getDocument && version && compareVersion?.version) {
            setCompareVersion({
              ...compareVersion,
              compare: {
                data: version,
                repoId,
                document: getDocument,
              },
            });
            toggleModal("compare", true);
          } else if (getRepo && getDocument && version && repoId) {
            setCompareVersion({
              version: {
                data: version,
                repoId,
                document: getDocument,
              },
              compare: null,
            });
          }
        },
        className: "compare-version",
      },
      ...otherOption,
      {
        text: "کپی هش فایل",
        icon: <CopyIcon className="h-4 w-4 fill-icon-active stroke-[1.5]" />,
        onClick: () => {
          if (version) {
            setVersion(version);
          }
          const hash = version?.hash;
          if (hash) {
            copy(hash);
            toast.success("هش مربوط به پیش نویس کپی شد.");
          }
        },
        className: "copy-version-hash",
      },
      {
        text: "کپی آدرس اشتراک‌ گذاری",
        icon: <ShareIcon className="h-4 w-4 stroke-icon-active" />,
        onClick: () => {
          if (version) {
            setVersion(version);
          }
          if (version) {
            copy(`${window.location.href}&versionId=${version.id}&versionState=${version.state}`);
            toast.success("آدرس کپی شد.");
          }
        },
        className: "copy-version-url",
      },
      {
        text: version?.state === "draft" ? "حذف پیش نویس" : "حذف نسخه",
        icon: <DeleteIcon className="h-4 w-4" />,
        disabled: writerOrViewerRole() && version?.creator?.userName !== userInfo?.username,
        onClick: () => {
          toggleModal("delete", true);
          setOpenVersionActionDrawer(false);
          if (version) {
            setVersion(version);
          }
        },
        className: "delete-version",
      },
    ];
  };

  const draftVersionOption = [
    {
      text: "تایید و عمومی‌سازی پیش‌نویس",
      icon: <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      disabled: !adminOrOwnerRole(),
      onClick: () => {
        toggleModal("publicDraft", true);
        setOpenVersionActionDrawer(false);
        if (version) {
          setVersion(version);
        }
      },
      className: "confirmPublic-draft",
    },
    {
      text: (() => {
        if (version?.status === "editing") {
          return adminOrOwnerRole() ? "تایید پیش نویس" : "ارسال درخواست تایید نسخه به مدیر";
        }
        return adminOrOwnerRole() ? "عدم تایید پیش نویس" : "لغوارسال درخواست تایید پیش نویس";
      })(),
      icon:
        version?.status === "editing" ? (
          <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />
        ) : (
          <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />
        ),
      onClick: () => {
        setOpenVersionActionDrawer(false);
        if (version?.status === "editing" && version) {
          setVersion(version);
          toggleModal("confirm", true);
        } else if (version?.status === "pending" && version) {
          setVersion(version);
          toggleModal("cancelConfirm", true);
        }
      },
      className:
        (version?.status === "editing" && "confirm-version") ||
        (version?.status === "pending" && "cancel-confirm-version"),
    },
    version?.status === EDraftStatus.pending && adminOrOwnerRole()
      ? {
          text: "تایید درخواست تایید پیش نویس",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            toggleModal("acceptConfirmDraft", true);
            setOpenVersionActionDrawer(false);
            if (version) {
              setVersion(version);
            }
          },
        }
      : null,
  ].filter(Boolean) as MenuItem[];

  const privateVersionOption = [
    adminOrOwnerRole()
      ? {
          text: (() => {
            if (version?.status === "private") {
              return "ارسال درخواست عمومی شدن";
            }
            if (version?.status === "pending") return "لغو درخواست عمومی شدن نسخه";
          })(),
          icon:
            version?.status === "private" ? (
              <GlobeIcon className="h-4 w-4 fill-icon-active" />
            ) : (
              <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />
            ),
          onClick: () => {
            setOpenVersionActionDrawer(false);
            if (version?.status === "private" && adminOrOwnerRole()) {
              toggleModal("public", true);
              if (version) {
                setVersion(version);
              }
            } else if (version?.status === "pending" && adminOrOwnerRole()) {
              toggleModal("cancelPublic", true);
              if (version) {
                setVersion(version);
              }
            }
          },
          className:
            (version?.status === "private" && "public-version") ||
            (version?.status === "private" && "cancel-public-version"),
        }
      : null,
    version?.id !== lastVersion?.id
      ? {
          text: "انتخاب به عنوان آخرین نسخه",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            toggleModal("lastVersion", true);
            setOpenVersionActionDrawer(false);
            if (version) {
              setVersion(version);
            }
          },
          className: "set-last-version",
        }
      : null,
    version?.status === EVersionStatus.pending &&
    (getRepo?.roleName === ERoles.owner ||
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId))
      ? {
          text: "تایید درخواست عمومی شدن",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            toggleModal("acceptPublicVersion", true);
            setOpenVersionActionDrawer(false);
            if (version) {
              setVersion(version);
            }
          },
        }
      : null,
  ].filter(Boolean) as MenuItem[];

  const publicVersionOption = [
    version?.id !== lastVersion?.id
      ? {
          text: "انتخاب به عنوان آخرین نسخه",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            toggleModal("lastVersion", true);
            setOpenVersionActionDrawer(false);
            if (version) {
              setVersion(version);
            }
          },
        }
      : null,
    ...(version?.status === EDraftStatus.waitForDirectPublic &&
    (getRepo?.roleName === ERoles.owner ||
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId))
      ? [
          {
            text: "تایید درخواست تایید و عمومی شدن",
            icon: <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
            onClick: () => {
              toggleModal("acceptPublicDraft", true);
              setOpenVersionActionDrawer(false);
              if (version) {
                setVersion(version);
              }
            },
          },
          {
            text: "رد درخواست تایید و عمومی شدن",
            icon: <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />,
            onClick: () => {
              toggleModal("rejectPublicDraft", true);
              setOpenVersionActionDrawer(false);
              if (version) {
                setVersion(version);
              }
            },
          },
        ]
      : []),
  ].filter(Boolean) as MenuItem[];

  if (
    version?.status === "editing" ||
    (version?.status === "pending" && version?.state === "draft")
  ) {
    return defaultOptions(draftVersionOption) as MenuItem[];
  }
  if (
    version?.status === "private" ||
    (version?.status === "pending" && version?.state === "version")
  ) {
    return defaultOptions(privateVersionOption) as MenuItem[];
  }

  return defaultOptions(publicVersionOption) as MenuItem[];
};

export default useVersionMenuList;
