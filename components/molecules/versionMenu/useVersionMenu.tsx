import {
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
import {
  compareVersionAtom,
  selectedVersionAtom,
  versionModalListAtom,
} from "@atom/version";
import { editorDataAtom, editorModalAtom, editorModeAtom } from "@atom/editor";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IVersion } from "@interface/version.interface";
import React from "react";
import copy from "copy-to-clipboard";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

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
};

const useVersionMenuList = (
  version: IVersion | null,
  lastVersion: IVersion | undefined,
  toggleModal: (modalName: keyof ModalType, value: boolean) => void
): MenuItem[] => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const [compareVersion, setCompareVersion] =
    useRecoilState(compareVersionAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const setVersionData = useSetRecoilState(editorDataAtom);
  const currentPath = usePathname();

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return (
        getDocument?.accesses?.[0] === "admin" ||
        getDocument?.accesses?.[0] === "owner"
      );
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const viewerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return (
        getDocument?.accesses?.[0] === "viewer" ||
        getDocument?.accesses?.[0] === "writer"
      );
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
        disabled: viewerRole(),
        onClick: () => {
          toggleModal("clone", true);
          if (version) {
            setVersion(version);
          }
        },
      },
      {
        text: "ویرایش",
        icon: <EditIcon className="h-4 w-4" />,
        disabled:
          viewerRole() && version?.creator?.userName !== userInfo?.username,
        onClick: () => {
          setVersion(version);
          setEditorMode("edit");
          setEditorModal(true);
          setVersionModalList(false);
          setVersionData(null);
        },
      },
      {
        text: compareVersion?.version ? "مقایسه با نسخه مورد نظر" : "مقایسه",
        icon: <ComparisionIcon className="h-4 w-4 stroke-icon-active" />,
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
          } else if (getRepo && getDocument && version) {
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
      },
      {
        text: "کپی آدرس اشتراک‌ گذاری",
        icon: <ShareIcon className="h-4 w-4 stroke-icon-active" />,
        onClick: () => {
          if (version) {
            setVersion(version);
          }
          if (version) {
            copy(
              `${window.location.href}&versionId=${version.id}&versionState=${version.state}`
            );
            toast.success("آدرس کپی شد.");
          }
        },
      },
      {
        text: version?.state === "draft" ? "حذف پیش نویس" : "حذف نسخه",
        icon: <DeleteIcon className="h-4 w-4" />,
        disabled: viewerRole(),
        onClick: () => {
          toggleModal("delete", true);
          if (version) {
            setVersion(version);
          }
        },
      },
    ];
  };

  const draftVersionOption = [
    {
      text: (() => {
        if (version?.status === "editing") {
          return adminOrOwnerRole()
            ? "تایید پیش نویس"
            : "ارسال درخواست تایید نسخه به مدیر";
        }
        return adminOrOwnerRole()
          ? "عدم تایید پیش نویس"
          : "لغوارسال درخواست تایید پیش نویس";
      })(),
      icon: <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      onClick: () => {
        if (version?.status === "editing" && version) {
          setVersion(version);
          toggleModal("confirm", true);
        } else if (version?.status === "pending" && version) {
          setVersion(version);
          toggleModal("cancelConfirm", true);
        }
      },
    },
  ];

  const privateVersionOption = [
    adminOrOwnerRole()
      ? {
          text: (() => {
            if (version?.status === "private") {
              return "ارسال درخواست عمومی شدن";
            }
            if (version?.status === "pending")
              return "لغو درخواست عمومی شدن نسخه";
          })(),
          icon: <GlobeIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
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
        }
      : null,
    version?.id !== lastVersion?.id
      ? {
          text: "انتخاب به عنوان آخرین نسخه",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            toggleModal("lastVersion", true);
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
            if (version) {
              setVersion(version);
            }
          },
        }
      : null,
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
