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
  PublishIcon,
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
import { MenuItem } from "@components/templates/menuTemplate";
import useCollaborateFormVersion from "@hooks/formVersion/useCollaborateFormVersion";
import useAutoLoginCode from "@hooks/autoLogin/useAutoLoginCode";

const createItem = (
  text: string,
  icon: React.JSX.Element,
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

    return getRepo?.roleName === ERoles.viewer || getRepo?.roleName === ERoles.writer;
  };

  return { isAdminOrOwner, isWriterOrViewer };
};

const useVersionMenu = (
  version: IVersion | null,
  lastVersion: IVersion | undefined,
  setModal: (modalName: string) => void,
): MenuItem[] => {
  const { repo } = useRepositoryStore();
  const { selectedDocument: getDocument } = useDocumentStore();
  const { setSelectedVersion, compareVersion, setCompareVersion, setVersionModalList } =
    useVersionStore();
  const { setEditorMode, setEditorModal, setEditorData: setVersionData } = useEditorStore();
  const repoId = useRepoId();
  const { isAdminOrOwner, isWriterOrViewer } = useRoles();

  const { data: userInfo } = useGetUser();
  const collaborateFrom = useCollaborateFormVersion();
  const autoLogin = useAutoLoginCode();

  if (!version || !getDocument) return [];

  const handleOpenFormEditor = () => {
    collaborateFrom.mutate({
      repoId: repo!.id,
      documentId: getDocument!.id,
      versionId: version.id,
      callBack: () => {
        autoLogin.mutate({
          callBack: (code) => {
            const url = `${process.env.NEXT_PUBLIC_PODFORM_URL}/app/auto-login?form_Id=${version.formId}&auto_login_code=${code}&embed=false`;
            window.open(url);
          },
        });
      },
    });
  };

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
        disabled:
          getDocument.contentType === EDocumentTypes.form ||
          (isWriterOrViewer() &&
            version.creator?.userName.toLowerCase() !== userInfo?.username.toLowerCase()),
      },
    ),
    createItem(
      "ویرایش",
      <EditIcon className="h-4 w-4" />,
      () => {
        if (getDocument.contentType === EDocumentTypes.form) {
          handleOpenFormEditor();
        } else {
          setSelectedVersion(version);
          setEditorMode("edit");
          setEditorModal(true);
          setVersionModalList(false);
          setVersionData(null);
        }
      },
      {
        className: "edit-version",
        disabled:
          isWriterOrViewer() &&
          version.creator?.userName.toLowerCase() !== userInfo?.username.toLowerCase(),
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
      () => {
        window.metrics?.track("version:publicDraft_dialog");
        createAction("publicDraft");
      },
      {
        className: "confirmPublic-draft",
        disabled: isWriterOrViewer(),
      },
    ),
    createItem(
      version.status === "editing" ? "تایید پیش نویس" : "عدم تایید پیش نویس",
      version.status === "editing" ? (
        <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />
      ) : (
        <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />
      ),
      () => {
        window.metrics?.track(
          version.status === "editing" ? "version:confirm_dialog" : "version:cancelConfirm_dialog",
        );
        createAction(version.status === "editing" ? "confirm" : "cancelConfirm");
      },
      {
        className: version.status === "editing" ? "confirm-version" : "cancel-confirm-version",
        disabled:
          getDocument.contentType === EDocumentTypes.form ||
          (isWriterOrViewer() &&
            version.creator?.userName.toLowerCase() !== userInfo?.username.toLowerCase()),
      },
    ),
    ...(version.status === EDraftStatus.pending && isAdminOrOwner()
      ? [
          createItem(
            "تایید درخواست تایید پیش نویس",
            <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
            () => {
              window.metrics?.track("version:acceptConfirmDraft_dialog");
              createAction("acceptConfirmDraft");
            },
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
            () => {
              window.metrics?.track(
                version.status === "private"
                  ? "version:public_dialog"
                  : "version:cancelPublic_dialog",
              );
              createAction(version.status === "private" ? "public" : "cancelPublic");
            },
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
            () => {
              window.metrics?.track("version:setLastVersion_dialog");
              createAction("lastVersion");
            },
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
            () => {
              window.metrics?.track("version:acceptPublicVersion_dialog");
              createAction("acceptPublicVersion");
            },
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
            () => {
              window.metrics?.track("version:setLastVersion_dialog");
              createAction("lastVersion");
            },
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
            () => {
              window.metrics?.track("version:acceptPublicDraft_dialog");
              createAction("acceptPublicDraft");
            },
          ),
          createItem(
            "رد درخواست تایید و عمومی شدن",
            <CancelVersionIcon className="h-4 w-4 stroke-icon-active" />,
            () => {
              window.metrics?.track("version:rejectPublicDraft_dialog");
              createAction("rejectPublicDraft");
            },
          ),
        ]
      : []),
    ...(getDocument.contentType === EDocumentTypes.form
      ? [
          createItem("خروجی‌های نسخه", <PublishIcon className="h-4 w-4 fill-icon-active" />, () => {
            window.metrics?.track("version:podformExport_dialog");
            createAction("formVersionExport");
          }),
        ]
      : []),
    ...(getDocument.contentType === EDocumentTypes.form
      ? [
          createItem(
            "کپی لینک فرم",
            <CopyIcon className="h-4 w-4 fill-icon-active stroke-[1.5]" />,
            () => {
              window.metrics?.track("version:copyPodformHash");
              if (version.formHash) {
                copy(`https://podform.sandpod.ir/f/${version.formHash}`);
                toast.success("لینک فرم کپی شد.");
              }
            },
            { className: "copy-form-version-link" },
          ),
        ]
      : []),
  ];

  const footerOptions: MenuItem[] = [
    ...(getDocument.publicKeyId
      ? []
      : [
          createItem(
            "کپی هش فایل",
            <CopyIcon className="h-4 w-4 fill-icon-active stroke-[1.5]" />,
            () => {
              window.metrics?.track("version:copyHash");
              if (version.hash) {
                copy(version.hash);
                toast.success("هش مربوط به پیش نویس کپی شد.");
              }
            },
            { className: "copy-version-hash" },
          ),
        ]),
    createItem(
      "کپی آدرس اشتراک‌ گذاری",
      <ShareIcon className="h-4 w-4 stroke-icon-active" />,
      () => {
        window.metrics?.track("version:copyUrl");
        copy(`${window.location.href}&versionId=${version.id}&versionState=${version.state}`);
        toast.success("آدرس کپی شد.");
      },
      { className: "copy-version-url" },
    ),
    createItem(
      version.state === "draft" ? "حذف پیش نویس" : "حذف نسخه",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        window.metrics?.track("version:delete_dialog");
        createAction("delete");
      },
      {
        className: "delete-version",
        disabled:
          isWriterOrViewer() &&
          version.creator?.userName.toLowerCase() !== userInfo?.username.toLowerCase(),
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
