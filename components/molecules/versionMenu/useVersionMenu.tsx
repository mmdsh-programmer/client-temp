import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editorDataAtom, editorModalAtom, editorModeAtom } from "@atom/editor";
import {
  compareVersionAtom,
  selectedVersionAtom,
  versionModalListAtom,
} from "@atom/version";
import { IVersion } from "@interface/version.interface";
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
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

interface MenuItem {
  text: string;
  icon?: JSX.Element;
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

  const adminOrOwner =
    getRepo?.roleName === "admin" || getRepo?.roleName === "owner";

  const defaultOptions = (otherOption: MenuItem[]) => {
    return [
      {
        text: "ایجاد نسخه جدید از نسخه",
        icon: <DuplicateIcon className="h-4 w-4 stroke-icon-active" />,
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
          if (getRepo && getDocument && version && compareVersion?.version) {
            setCompareVersion({
              ...compareVersion,
              compare: { data: version, repo: getRepo, document: getDocument },
            });
            toggleModal("compare", true);
          } else if (getRepo && getDocument && version) {
            setCompareVersion({
              version: { data: version, repo: getRepo, document: getDocument },
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
        icon: <ShareIcon className="h-4 w-4" />,
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
          return adminOrOwner
            ? "تایید نسخه"
            : "ارسال درخواست تایید نسخه به مدیر";
        }
        return adminOrOwner ? "عدم تایید نسخه" : "لغوارسال درخواست تایید نسخه";
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
    adminOrOwner
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
            if (version?.status === "private" && adminOrOwner) {
              toggleModal("public", true);
              if (version) {
                setVersion(version);
              }
            } else if (version?.status === "pending" && adminOrOwner) {
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
